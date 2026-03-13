package __PACKAGE__.servicerequest;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;

public class IncomingRequestActivity extends AppCompatActivity {
    static Intent createIntent(Context context, JSONObject requestData) {
        Intent intent = new Intent(context, IncomingRequestActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        if (requestData != null) {
            intent.putExtra(RequestUiManager.EXTRA_REQUEST_DATA, requestData.toString());
        }
        return intent;
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true);
            setTurnScreenOn(true);
        } else {
            getWindow().addFlags(
                    WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                            | WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON
                            | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                            | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
            );
        }

        JSONObject payload = RequestUiManager.parseRequest(
                getIntent() != null ? getIntent().getStringExtra(RequestUiManager.EXTRA_REQUEST_DATA) : null
        );

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER);
        root.setPadding(48, 64, 48, 64);
        root.setBackgroundColor(Color.parseColor("#0B1020"));

        TextView title = buildText("Incoming Service Request", 28, true, "#FFFFFF");
        root.addView(title);
        root.addView(buildSpacer(24));
        root.addView(buildText("Location: " + RequestUiManager.valueOrFallback(payload, "serviceLocation", "-"), 18, false, "#E5E7EB"));
        root.addView(buildSpacer(12));
        root.addView(buildText("Service: " + RequestUiManager.valueOrFallback(payload, "serviceName", "-"), 18, false, "#E5E7EB"));
        root.addView(buildSpacer(12));
        root.addView(buildText("Earning: Rs " + RequestUiManager.valueOrFallback(payload, "earningPrice", "0"), 18, false, "#E5E7EB"));
        root.addView(buildSpacer(12));
        root.addView(buildText("Commission: Rs " + RequestUiManager.valueOrFallback(payload, "commissionPrice", "0"), 18, false, "#E5E7EB"));
        root.addView(buildSpacer(28));

        Button acceptButton = new Button(this);
        acceptButton.setText("Accept");
        acceptButton.setOnClickListener((view) -> {
            RequestUiManager.handleAction(this, "accept", payload);
            finish();
        });
        root.addView(acceptButton);

        root.addView(buildSpacer(12));

        Button rejectButton = new Button(this);
        rejectButton.setText("Reject");
        rejectButton.setOnClickListener((view) -> {
            RequestUiManager.handleAction(this, "reject", payload);
            finish();
        });
        root.addView(rejectButton);

        setContentView(root);
    }

    private TextView buildText(String value, int size, boolean bold, String color) {
        TextView textView = new TextView(this);
        textView.setText(value);
        textView.setTextSize(size);
        textView.setTextColor(Color.parseColor(color));
        if (bold) {
            textView.setTypeface(textView.getTypeface(), android.graphics.Typeface.BOLD);
        }
        return textView;
    }

    private TextView buildSpacer(int height) {
        TextView spacer = new TextView(this);
        spacer.setHeight(height);
        return spacer;
    }
}
