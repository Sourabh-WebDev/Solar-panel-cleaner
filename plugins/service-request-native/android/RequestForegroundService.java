package __PACKAGE__.servicerequest;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import androidx.annotation.Nullable;

import org.json.JSONObject;

public class RequestForegroundService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        JSONObject payload = RequestUiManager.parseRequest(
                intent != null ? intent.getStringExtra(RequestUiManager.EXTRA_REQUEST_DATA) : null
        );

        RequestUiManager.ensureNotificationChannel(this);
        Notification notification = RequestUiManager.buildNotification(this, payload);
        startForeground(RequestUiManager.NOTIFICATION_ID, notification);
        RequestUiManager.startLoopingSound(this);
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
