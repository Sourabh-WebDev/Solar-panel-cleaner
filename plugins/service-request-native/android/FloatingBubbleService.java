package __PACKAGE__.servicerequest;

import android.app.Service;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;

import org.json.JSONObject;

public class FloatingBubbleService extends Service {
    private WindowManager windowManager;
    private FrameLayout rootLayout;
    private WindowManager.LayoutParams layoutParams;
    private View cardView;
    private JSONObject payload;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent != null ? intent.getAction() : null;

        if (RequestUiManager.ACTION_STOP_BUBBLE.equals(action)) {
            removeBubble();
            stopSelf();
            return START_NOT_STICKY;
        }

        payload = RequestUiManager.parseRequest(
                intent != null ? intent.getStringExtra(RequestUiManager.EXTRA_REQUEST_DATA) : null
        );
        showBubble();
        return START_STICKY;
    }

    private void showBubble() {
        if (rootLayout != null) {
            return;
        }

        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);

        int overlayType =
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                        ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                        : WindowManager.LayoutParams.TYPE_PHONE;

        layoutParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                overlayType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT
        );
        layoutParams.gravity = Gravity.TOP | Gravity.START;
        layoutParams.x = 40;
        layoutParams.y = 220;

        rootLayout = new FrameLayout(this);
        LinearLayout container = new LinearLayout(this);
        container.setOrientation(LinearLayout.VERTICAL);

        TextView bubble = new TextView(this);
        bubble.setText("\u25CF");
        bubble.setTextSize(28);
        bubble.setTextColor(Color.WHITE);
        bubble.setGravity(Gravity.CENTER);
        bubble.setBackgroundColor(Color.parseColor("#0B6DFF"));
        bubble.setPadding(28, 20, 28, 20);
        bubble.setOnClickListener((view) -> toggleCard());
        bubble.setOnTouchListener(new BubbleTouchListener());
        container.addView(bubble);

        cardView = buildCard();
        cardView.setVisibility(View.GONE);
        container.addView(cardView);

        rootLayout.addView(container);
        windowManager.addView(rootLayout, layoutParams);
    }

    private View buildCard() {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setBackgroundColor(Color.WHITE);
        card.setPadding(24, 24, 24, 24);

        card.addView(buildText(RequestUiManager.valueOrFallback(payload, "serviceName", "Service"), 18, true, "#10243E"));
        card.addView(buildText(RequestUiManager.valueOrFallback(payload, "serviceLocation", "-"), 16, false, "#4B5563"));
        card.addView(buildText("Earning: Rs " + RequestUiManager.valueOrFallback(payload, "earningPrice", "0"), 16, false, "#10243E"));
        card.addView(buildText("Commission: Rs " + RequestUiManager.valueOrFallback(payload, "commissionPrice", "0"), 16, false, "#10243E"));

        Button acceptButton = new Button(this);
        acceptButton.setText("Accept");
        acceptButton.setOnClickListener((view) -> {
            RequestUiManager.handleAction(this, "accept", payload);
            removeBubble();
            stopSelf();
        });
        card.addView(acceptButton);

        Button rejectButton = new Button(this);
        rejectButton.setText("Reject");
        rejectButton.setOnClickListener((view) -> {
            RequestUiManager.handleAction(this, "reject", payload);
            removeBubble();
            stopSelf();
        });
        card.addView(rejectButton);

        return card;
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

    private void toggleCard() {
        if (cardView == null) {
            return;
        }
        cardView.setVisibility(cardView.getVisibility() == View.VISIBLE ? View.GONE : View.VISIBLE);
    }

    private void removeBubble() {
        if (windowManager != null && rootLayout != null) {
            windowManager.removeView(rootLayout);
        }
        rootLayout = null;
        cardView = null;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        removeBubble();
        super.onDestroy();
    }

    private class BubbleTouchListener implements View.OnTouchListener {
        private int initialX;
        private int initialY;
        private float initialTouchX;
        private float initialTouchY;

        @Override
        public boolean onTouch(View view, MotionEvent motionEvent) {
            switch (motionEvent.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    initialX = layoutParams.x;
                    initialY = layoutParams.y;
                    initialTouchX = motionEvent.getRawX();
                    initialTouchY = motionEvent.getRawY();
                    return false;
                case MotionEvent.ACTION_MOVE:
                    layoutParams.x = initialX + (int) (motionEvent.getRawX() - initialTouchX);
                    layoutParams.y = initialY + (int) (motionEvent.getRawY() - initialTouchY);
                    if (windowManager != null && rootLayout != null) {
                        windowManager.updateViewLayout(rootLayout, layoutParams);
                    }
                    return true;
                default:
                    return false;
            }
        }
    }
}
