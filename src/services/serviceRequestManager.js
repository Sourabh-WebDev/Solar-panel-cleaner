import { AppState, Platform } from "react-native";

import { navigate } from "../navigation/navigationRef";
import {
  canDrawOverlays,
  getServiceRequestEventEmitter,
  requestOverlayPermission,
  showIncomingRequestScreen,
  startFloatingBubble,
  stopFloatingBubble,
  stopRequestSound,
} from "../native/serviceRequestModule";

let currentAppState = AppState.currentState;
let appStateSubscription;
let actionSubscription;
let messageUnsubscribe;
let requestResolver;

function safeRequire(moduleName) {
  try {
    return require(moduleName);
  } catch (_error) {
    return null;
  }
}

function normalizeRequestData(input = {}) {
  return {
    serviceLocation: input.serviceLocation ?? input.location ?? "",
    serviceName: input.serviceName ?? input.name ?? "",
    earningPrice: Number(input.earningPrice ?? input.earning ?? 0),
    commissionPrice: Number(input.commissionPrice ?? input.commission ?? 0),
  };
}

async function requestNotificationPermission() {
  const Notifications = safeRequire("expo-notifications");
  if (!Notifications) {
    return;
  }

  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return;
  }

  await Notifications.requestPermissionsAsync();
}

export async function ensureServiceRequestPermissions() {
  if (Platform.OS !== "android") {
    return;
  }

  await requestNotificationPermission();

  try {
    const allowed = await canDrawOverlays();
    if (!allowed) {
      await requestOverlayPermission();
    }
  } catch (error) {
    console.warn("Overlay permission check failed", error);
  }
}

export async function presentIncomingRequest(requestData, options = {}) {
  if (Platform.OS !== "android") {
    return;
  }

  const normalized = normalizeRequestData(requestData);
  const shouldUseBubble = options.forceBubble ?? currentAppState !== "active";

  await showIncomingRequestScreen(normalized);

  if (shouldUseBubble) {
    try {
      const allowed = await canDrawOverlays();
      if (allowed) {
        await startFloatingBubble(normalized);
      }
    } catch (error) {
      console.warn("Unable to show floating bubble", error);
    }
  }

  if (currentAppState === "active") {
    navigate("IncomingRequest", { requestData: normalized });
  }
}

export async function resolveIncomingRequest(action, requestData) {
  const normalized = normalizeRequestData(requestData);
  await stopRequestSound();
  await stopFloatingBubble();

  if (typeof requestResolver === "function") {
    requestResolver({ action, requestData: normalized });
  }
}

export function setIncomingRequestResolver(resolver) {
  requestResolver = resolver;
}

export function initializeServiceRequestManager({ isTechnician }) {
  if (!isTechnician || Platform.OS !== "android") {
    return () => {};
  }

  const emitter = getServiceRequestEventEmitter();

  appStateSubscription?.remove?.();
  actionSubscription?.remove?.();
  messageUnsubscribe?.();

  appStateSubscription = AppState.addEventListener("change", async (nextState) => {
    currentAppState = nextState;
    if (nextState === "active") {
      try {
        await stopFloatingBubble();
      } catch (error) {
        console.warn("Unable to stop floating bubble", error);
      }
    }
  });

  if (emitter) {
    actionSubscription = emitter.addListener("ServiceRequestAction", async (event) => {
      const requestData = event?.requestData ? JSON.parse(event.requestData) : {};
      await resolveIncomingRequest(event?.action, requestData);
    });
  }

  const messagingModule = safeRequire("@react-native-firebase/messaging");
  const messaging = messagingModule?.default;

  if (messaging) {
    messageUnsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage?.data ?? {};
      if (data.type === "service_request") {
        await presentIncomingRequest(data);
      }
    });
  }

  return () => {
    appStateSubscription?.remove?.();
    actionSubscription?.remove?.();
    messageUnsubscribe?.();
  };
}

export function registerBackgroundServiceRequestHandler() {
  const messagingModule = safeRequire("@react-native-firebase/messaging");
  const messaging = messagingModule?.default;

  if (!messaging || Platform.OS !== "android") {
    return;
  }

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const data = remoteMessage?.data ?? {};
    if (data.type === "service_request") {
      await presentIncomingRequest(data, { forceBubble: true });
    }
  });
}
