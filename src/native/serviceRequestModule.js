import { NativeEventEmitter, NativeModules, Platform } from "react-native";

const LINKING_ERROR =
  "ServiceRequestModule is unavailable. Run expo prebuild and build an Android dev client before using service request alerts.";

const NativeServiceRequestModule = NativeModules.ServiceRequestModule;

function ensureAndroidModule() {
  if (Platform.OS !== "android") {
    throw new Error("Service request alerts are implemented for Android only.");
  }

  if (!NativeServiceRequestModule) {
    throw new Error(LINKING_ERROR);
  }

  return NativeServiceRequestModule;
}

export function getServiceRequestEventEmitter() {
  if (!NativeServiceRequestModule) {
    return null;
  }

  return new NativeEventEmitter(NativeServiceRequestModule);
}

export async function startFloatingBubble(requestData) {
  return ensureAndroidModule().startFloatingBubble(requestData);
}

export async function stopFloatingBubble() {
  return ensureAndroidModule().stopFloatingBubble();
}

export async function showIncomingRequestScreen(requestData) {
  return ensureAndroidModule().showIncomingRequestScreen(requestData);
}

export async function stopRequestSound() {
  return ensureAndroidModule().stopRequestSound();
}

export async function canDrawOverlays() {
  return ensureAndroidModule().canDrawOverlays();
}

export async function requestOverlayPermission() {
  return ensureAndroidModule().requestOverlayPermission();
}
