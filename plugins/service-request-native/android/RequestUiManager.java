package __PACKAGE__.servicerequest;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public final class RequestUiManager {
    static final String CHANNEL_ID = "incoming_service_requests";
    static final int NOTIFICATION_ID = 43121;
    static final String EXTRA_REQUEST_DATA = "extra_request_data";
    static final String ACTION_SHOW_BUBBLE = "__PACKAGE__.action.SHOW_BUBBLE";
    static final String ACTION_STOP_BUBBLE = "__PACKAGE__.action.STOP_BUBBLE";
    static final String ACTION_ACCEPT = "__PACKAGE__.action.ACCEPT";
    static final String ACTION_REJECT = "__PACKAGE__.action.REJECT";
    static final String ACTION_STOP_SOUND = "__PACKAGE__.action.STOP_SOUND";
    private static JSONObject currentRequest;
    private static MediaPlayer mediaPlayer;

    private RequestUiManager() {}

    static void showIncomingRequest(Context context, JSONObject requestData) {
        currentRequest = requestData;
        ensureNotificationChannel(context);

        Intent serviceIntent = new Intent(context, RequestForegroundService.class);
        serviceIntent.putExtra(EXTRA_REQUEST_DATA, requestData.toString());
        ContextCompat.startForegroundService(context, serviceIntent);

        NotificationManager notificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(NOTIFICATION_ID, buildNotification(context, requestData));
    }

    static void startFloatingBubble(Context context, JSONObject requestData) {
        currentRequest = requestData;
        Intent intent = new Intent(context, FloatingBubbleService.class);
        intent.setAction(ACTION_SHOW_BUBBLE);
        intent.putExtra(EXTRA_REQUEST_DATA, requestData.toString());
        context.startService(intent);
    }

    static void stopFloatingBubble(Context context) {
        Intent intent = new Intent(context, FloatingBubbleService.class);
        intent.setAction(ACTION_STOP_BUBBLE);
        context.startService(intent);
    }

    static void stopSound(Context context) {
        NotificationManager notificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancel(NOTIFICATION_ID);

        if (mediaPlayer != null) {
            if (mediaPlayer.isPlaying()) {
                mediaPlayer.stop();
            }
            mediaPlayer.release();
            mediaPlayer = null;
        }

        context.stopService(new Intent(context, RequestForegroundService.class));
    }

    static void handleAction(Context context, String action, JSONObject requestData) {
        currentRequest = requestData;
        stopSound(context);
        stopFloatingBubble(context);
        ServiceRequestModule.emitActionEvent(action, requestData);
    }

    static Notification buildNotification(Context context, JSONObject requestData) {
        PendingIntent fullScreenIntent = PendingIntent.getActivity(
                context,
                100,
                IncomingRequestActivity.createIntent(context, requestData),
                pendingIntentFlags(PendingIntent.FLAG_UPDATE_CURRENT)
        );

        PendingIntent acceptIntent = PendingIntent.getBroadcast(
                context,
                101,
                RequestActionReceiver.createIntent(context, ACTION_ACCEPT, requestData),
                pendingIntentFlags(PendingIntent.FLAG_UPDATE_CURRENT)
        );

        PendingIntent rejectIntent = PendingIntent.getBroadcast(
                context,
                102,
                RequestActionReceiver.createIntent(context, ACTION_REJECT, requestData),
                pendingIntentFlags(PendingIntent.FLAG_UPDATE_CURRENT)
        );

        return new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(context.getApplicationInfo().icon)
                .setContentTitle(valueOrFallback(requestData, "serviceName", "New service request"))
                .setContentText(valueOrFallback(requestData, "serviceLocation", "Tap to respond"))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_CALL)
                .setOngoing(true)
                .setAutoCancel(false)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setFullScreenIntent(fullScreenIntent, true)
                .setContentIntent(fullScreenIntent)
                .addAction(0, "Accept", acceptIntent)
                .addAction(0, "Reject", rejectIntent)
                .build();
    }

    static void ensureNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        NotificationChannel channel = manager.getNotificationChannel(CHANNEL_ID);
        if (channel != null) {
            return;
        }

        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        AudioAttributes attributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();

        channel = new NotificationChannel(
                CHANNEL_ID,
                "Incoming service requests",
                NotificationManager.IMPORTANCE_HIGH
        );
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.enableVibration(true);
        channel.setSound(soundUri, attributes);
        manager.createNotificationChannel(channel);
    }

    static void startLoopingSound(Context context) {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            return;
        }

        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        mediaPlayer = MediaPlayer.create(context, soundUri);
        if (mediaPlayer == null) {
            return;
        }

        mediaPlayer.setLooping(true);
        mediaPlayer.setVolume(1f, 1f);
        mediaPlayer.start();
    }

    static JSONObject readableMapToJson(ReadableMap map) throws JSONException {
        JSONObject object = new JSONObject();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = map.getType(key);
            switch (type) {
                case String:
                    object.put(key, map.getString(key));
                    break;
                case Number:
                    object.put(key, map.getDouble(key));
                    break;
                case Boolean:
                    object.put(key, map.getBoolean(key));
                    break;
                case Map:
                    object.put(key, readableMapToJson(map.getMap(key)));
                    break;
                case Array:
                    object.put(key, readableArrayToJson(map.getArray(key)));
                    break;
                case Null:
                default:
                    object.put(key, JSONObject.NULL);
                    break;
            }
        }
        return object;
    }

    private static JSONArray readableArrayToJson(ReadableArray array) throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (int index = 0; index < array.size(); index += 1) {
            ReadableType type = array.getType(index);
            switch (type) {
                case String:
                    jsonArray.put(array.getString(index));
                    break;
                case Number:
                    jsonArray.put(array.getDouble(index));
                    break;
                case Boolean:
                    jsonArray.put(array.getBoolean(index));
                    break;
                case Map:
                    jsonArray.put(readableMapToJson(array.getMap(index)));
                    break;
                case Array:
                    jsonArray.put(readableArrayToJson(array.getArray(index)));
                    break;
                case Null:
                default:
                    jsonArray.put(JSONObject.NULL);
                    break;
            }
        }
        return jsonArray;
    }

    static JSONObject parseRequest(String rawPayload) {
        if (rawPayload == null || rawPayload.isEmpty()) {
            return currentRequest;
        }

        try {
            currentRequest = new JSONObject(rawPayload);
        } catch (JSONException exception) {
            return currentRequest;
        }
        return currentRequest;
    }

    static int pendingIntentFlags(int baseFlags) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return baseFlags | PendingIntent.FLAG_IMMUTABLE;
        }
        return baseFlags;
    }

    static String valueOrFallback(JSONObject payload, String key, String fallback) {
        if (payload == null) {
            return fallback;
        }
        return payload.optString(key, fallback);
    }
}
