/* Fill in the access code and your router IP below */

var routerAccessCode = "EnterRouterAccessCodeHere";
var routerIP = "192.168.1.254";

/****************************************************/

var querystring = require('querystring');
var request = require('request');
var PAGE = 'C_5_7';

function RebootRouter() {

    var form = {
        "ADM_PASSWORD" : routerAccessCode,
        "NEXTPAGE" : PAGE
    };

    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    var cookieJar = request.jar();

    request({

        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://' + routerIP + '/xslt?PAGE=login_post',
        jar: cookieJar,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {

        if (body===undefined) {
            console.log('Did not detect your gateway, please make sure you have specified your router access code + router IP using routerIP on lines 3 & 4 inside reboot.js')
            return;
        }

        var nonce=body.substr(body.indexOf("NONCE")).toLowerCase();
        nonce=nonce.substr(nonce.indexOf("value=")+7);
        nonce=nonce.substr(0,nonce.indexOf("\""));

        doRestart(cookieJar,nonce);

    });
}

function doRestart(cookieJar, nonce){

    var form = {
        "RESTART" : 'Reset',
        "NONCE": nonce,
        "CMSKICK": ""
    };
    var formData = querystring.stringify(form);
    var contentLength = formData.length;

    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://' + routerIP + '/xslt?PAGE=' + PAGE + '_POST&NEXTPAGE=' + PAGE + '_POST',
        jar: cookieJar,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {

        if (err) {
            console.log('Failed Reboot.');
            return;
        }

        console.log('Router Rebooting.');

    });

}

RebootRouter();
