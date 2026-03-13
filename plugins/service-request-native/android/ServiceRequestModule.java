package __PACKAGE__.servicerequest;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

public class ServiceRequestModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public ServiceRequestModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ServiceRequestModule";
    }

    @ReactMethod
    public void startFloatingBubble(ReadableMap requestData, Promise promise) {
        try {
            JSONObject payload = RequestUiManager.readableMapToJson(requestData);
            RequestUiManager.startFloatingBubble(getReactApplicationContext(), payload);
            promise.resolve(null);
        } catch (JSONException exception) {
            promise.reject("bubble_error", exception);
        }
    }

    @ReactMethod
    public void stopFloatingBubble(Promise promise) {
        RequestUiManager.stopFloatingBubble(getReactApplicationContext());
        promise.resolve(null);
    }

    @ReactMethod
    public void showIncomingRequestScreen(ReadableMap requestData, Promise promise) {
        try {
            JSONObject payload = RequestUiManager.readableMapToJson(requestData);
            RequestUiManager.showIncomingRequest(getReactApplicationContext(), payload);
            promise.resolve(null);
        } catch (JSONException exception) {
            promise.reject("incoming_request_error", exception);
        }
    }

    @ReactMethod
    public void stopRequestSound(Promise promise) {
        RequestUiManager.stopSound(getReactApplicationContext());
        promise.resolve(null);
    }

    @ReactMethod
    public void canDrawOverlays(Promise promise) {
        promise.resolve(Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(getReactApplicationContext()));
    }

    @ReactMethod
    public void requestOverlayPermission(Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(getReactApplicationContext())) {
            promise.resolve(true);
            return;
        }

        Intent intent = new Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + getReactApplicationContext().getPackageName())
        );
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
        promise.resolve(false);
    }

    static void emitActionEvent(String action, JSONObject payload) {
        if (reactContext == null || !reactContext.hasActiveCatalystInstance()) {
            return;
        }

        WritableMap event = Arguments.createMap();
        event.putString("action", action);
        if (payload != null) {
            event.putString("requestData", payload.toString());
        }

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ServiceRequestAction", event);
    }
}
