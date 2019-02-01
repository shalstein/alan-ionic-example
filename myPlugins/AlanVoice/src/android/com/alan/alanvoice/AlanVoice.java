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


public class AlanVoice extends CordovaPlugin {

    private static final String TAG = "plugins.AlanVoice";

    public void initialize(CordovaInterface cordova, CordovaWebView webView){
        super.initialize(cordova, webView);

        Log.d(TAG, "intitalizing AlanVoice plugin");
        Alan alan = Alan.getInstance();
        alan.init("f18a4135b0857d6ee7fe2f0078af3aeb2e956eca572e1d8b807a3e2338fdd0dc/stage");
        
        // if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
        //     ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.RECORD_AUDIO), PERMISSION_REQUEST_CODE);
        // }

    }

    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if(action.equals("coolMethod")){
            Log.d(TAG, "this is awesome");
        }
        else if(false) {

        }
        Log.d(TAG, "did not trigger any mehtrods");
        return true;
    }
}
