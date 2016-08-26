var zipco_bas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function zipco_dec(str) {
    str = str.split('@').join('CAg');
    str = str.split('!').join('W5');
    str = str.split('*').join('CAgI');
    var bt, dt = '';
    for (i = 0; i < str.length; i += 4) {
        bt = (zipco_bas.indexOf(str.charAt(i)) & 0xff) << 18 | (zipco_bas.indexOf(str.charAt(i + 1)) & 0xff) << 12 | (zipco_bas.indexOf(str.charAt(i + 2)) & 0xff) << 6 | zipco_bas.indexOf(str.charAt(i + 3)) & 0xff;
        dt += String.fromCharCode((bt & 0xff0000) >> 16, (bt & 0xff00) >> 8, bt & 0xff);
    }
    if (str.charCodeAt(i - 2) == 61) {
        return (dt.substring(0, dt.length - 2));
    } else if (str.charCodeAt(i - 1) == 61) {
        return (dt.substring(0, dt.length - 1));
    } else {
        return (dt)
    };
}


var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

function ebase(input) {
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}

function dbase(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    var mimcod = /[^A-Za-z0-9\+\/\=]/g;
    if (mimcod.exec(input)) {
        alert("Errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return unescape(output);
} <
/script>"
