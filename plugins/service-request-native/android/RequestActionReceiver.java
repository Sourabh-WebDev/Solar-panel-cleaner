package __PACKAGE__.servicerequest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import org.json.JSONObject;

public class RequestActionReceiver extends BroadcastReceiver {
    public static Intent createIntent(Context context, String action, JSONObject requestData) {
        Intent intent = new Intent(context, RequestActionReceiver.class);
        intent.setAction(action);
        if (requestData != null) {
            intent.putExtra(RequestUiManager.EXTRA_REQUEST_DATA, requestData.toString());
        }
        return intent;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent != null ? intent.getAction() : null;
        JSONObject payload = RequestUiManager.parseRequest(
                intent != null ? intent.getStringExtra(RequestUiManager.EXTRA_REQUEST_DATA) : null
        );

        if (RequestUiManager.ACTION_ACCEPT.equals(action)) {
            RequestUiManager.handleAction(context, "accept", payload);
        } else if (RequestUiManager.ACTION_REJECT.equals(action)) {
            RequestUiManager.handleAction(context, "reject", payload);
        } else if (RequestUiManager.ACTION_STOP_SOUND.equals(action)) {
            RequestUiManager.stopSound(context);
        }
    }
}
