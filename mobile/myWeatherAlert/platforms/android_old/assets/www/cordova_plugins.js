cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.chariotsolutions.toast.plugin/www/phonegap-toast.js",
        "id": "com.chariotsolutions.toast.plugin.Toasty",
        "clobbers": [
            "toast"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.geolocation": "0.3.10",
    "com.chariotsolutions.toast.plugin": "1.1.1"
}
// BOTTOM OF METADATA
});