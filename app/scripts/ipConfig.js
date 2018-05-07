var server = (function () {

    var megingJord = {
        'prod': "88.99.213.227"
    };
    var megingJordPort = {
        "prod": "3000"
    };

    return {
        megingJord: megingJord,
        megingJordPort: megingJordPort
    }

}());

var MegingJordApp = {};

MegingJordApp.Common = {
    "name": "MegingJord",
    "serverIP": server.megingJord.prod,
    "domain": "direct-beta.ninjacart.in",
    "serverPort": server.megingJordPort.prod
};