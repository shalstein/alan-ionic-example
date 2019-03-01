/*global cordova, module*/


module.exports = {
    subscribeToTextEvent: function ( successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AlanVoice", "subscribeToTextEvent");
    },
    subscribeToCommands: function ( successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AlanVoice", "subscribeToCommands");
    },
    subscribeToDialogState: function ( successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AlanVoice", "subscribeToDialogState");
    },
    subscribeToRecognizedEvents: function ( successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AlanVoice", "subscribeToRecognizedEvents");
    },
    toggle: function () {
        cordova.exec(null, null, "AlanVoice", "toggle");
    },
    
};


