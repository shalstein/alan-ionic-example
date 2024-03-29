package com.alan.alanvoice;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.util.Log;

import com.alan.alansdk.Alan;
import com.alan.alansdk.alanbase.DialogState;
import com.alan.alansdk.alanbase.ConnectionState;
import com.alan.alansdk.events.EventText;
import com.alan.alansdk.button.AlanButton;
import com.alan.alansdk.BasicSdkListener;
import com.alan.alansdk.AlanCallback;
import com.alan.alansdk.events.EventRecognised;

import android.support.annotation.NonNull;

import org.apache.cordova.PermissionHelper;
import android.Manifest;




public class AlanVoice extends CordovaPlugin {

    private static final String TAG = "plugins.AlanVoice";
    private DialogState alanState;
    private Alan sdk;
    private CallbackContext textCallbackContext = null;
    private CallbackContext eventCallbackContext = null;
    private CallbackContext dialogStateCallbackContext = null;
    private CallbackContext recognizedEventCallbackContext = null;


    public static String[]  permissions = { Manifest.permission.RECORD_AUDIO };
    public static int RECORD_AUDIO = 0;



    public void initialize(CordovaInterface cordova, CordovaWebView webView){
        super.initialize(cordova, webView);

        Log.d(TAG, "intitalizing AlanVoice plugin");
        Alan.enableLogging(true);
        this.sdk = Alan.getInstance();
        this.sdk.init("f18a4135b0857d6ee7fe2f0078af3aeb2e956eca572e1d8b807a3e2338fdd0dc/stage");
        this.sdk.registerCallback(new AlanOnConectStateCallback());
        this.alanState = DialogState.IDLE;
    }


    private void toggle()
    {
        if (this.sdk == null || !this.sdk.isInited()) {
            Log.i("AlanPlugin", "Alan sdk is null or not initalized!");
            return;
        }

        if (!PermissionHelper.hasPermission(this, permissions[RECORD_AUDIO])) {
            getMicPermission(RECORD_AUDIO);
        } else {
               sdk.toggle();
        }
        }


    private DialogState getState()
    {
      return this.alanState;
    }

    protected void getMicPermission(int requestCode) {
        PermissionHelper.requestPermission(this, requestCode, permissions[RECORD_AUDIO]);
    }



    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {        
        if(action.equals("toggle")) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run(){
                    AlanVoice.this.toggle();
                }

            });
        }        
        else if(action.equals("subscribeToTextEvent")){
            if(this.textCallbackContext == null){
            this.textCallbackContext = callbackContext;
            PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
            result.setKeepCallback(true);
            this.textCallbackContext.sendPluginResult(result);
        }
            this.sdk.registerCallback(new AlanTextEventListener());
        }
        else if(action.equals("subscribeToCommands")){
            if(this.eventCallbackContext == null){
            this.eventCallbackContext = callbackContext;
            PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
            result.setKeepCallback(true);
            this.eventCallbackContext.sendPluginResult(result);
        }
            this.sdk.registerCallback(new AlanCommandListener());
        }
        else if(action.equals("subscribeToDialogState")){
            if(this.dialogStateCallbackContext == null){
                this.dialogStateCallbackContext = callbackContext;
                PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
                result.setKeepCallback(true);
                this.dialogStateCallbackContext.sendPluginResult(result);
            }
            this.sdk.registerCallback(new AlanDialogStateListener());
        }
        else if (action.equals("subscribeToRecognizedEvents")) {
            if(this.recognizedEventCallbackContext == null) {
                this.recognizedEventCallbackContext = callbackContext;
                PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
                result.setKeepCallback(true);
                this.recognizedEventCallbackContext.sendPluginResult(result);
            }
            this.sdk.registerCallback(new AlanRecognizedEventsListener());
        }       
        return true;
    }


    class AlanTextEventListener extends BasicSdkListener
    {   
        @Override
        public void onTextEvent(@NonNull EventText eventText) {
            PluginResult text = new PluginResult(PluginResult.Status.OK, eventText.getText());
            text.setKeepCallback(true);
            AlanVoice.this.textCallbackContext.sendPluginResult(text);
            Log.i("AlanCallback", "my eventText callback " + eventText.getText());

        }
    }

    class AlanCommandListener extends BasicSdkListener 
    {
        @Override
        public void onEvent(@NonNull String event, String payload){

            Log.i("Alan", "my Event callback " + event + " " + payload);

            if(event.equals("command")){
                Log.i("Alan", "commands rock" + event + " " + payload);
                super.onEvent(event, payload);
                PluginResult eventResult = new PluginResult(PluginResult.Status.OK, payload );
                eventResult.setKeepCallback(true);
                AlanVoice.this.eventCallbackContext.sendPluginResult(eventResult);
            }

        }
    }

    class AlanOnConectStateCallback extends BasicSdkListener {
        @Override
        public void onConnectStateChanged(@NonNull ConnectionState connectState) {
            super.onConnectStateChanged(connectState);
            Log.i("AlanCallback", "Connection state changed -> " + connectState.name());
        }
    }

    class AlanDialogStateListener extends BasicSdkListener
    {
        AlanDialogStateListener() {}
        @Override
        public void onDialogStateChanged(@NonNull DialogState dialogState)
        {
            AlanVoice.this.alanState = dialogState;
            PluginResult state = new PluginResult(PluginResult.Status.OK, dialogState.name());
            state.setKeepCallback(true);
            AlanVoice.this.dialogStateCallbackContext.sendPluginResult(state);
        }
    }

    class AlanRecognizedEventsListener extends BasicSdkListener 
    {
        @Override
        public void onRecognizedEvent(@NonNull EventRecognised eventRecognized)
        {
            Log.i("AlanCallback", "my recgnized event callback " + eventRecognized.getText());
            PluginResult event = new PluginResult(PluginResult.Status.OK, eventRecognized.getText());
            event.setKeepCallback(true);
            AlanVoice.this.recognizedEventCallbackContext.sendPluginResult(event);
        }

    }
}




