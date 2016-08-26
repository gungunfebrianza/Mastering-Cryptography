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



function completeEscape(oString) {
    var strArray = new Array(),
        fromChar = new Array();
    for (var x = 0; x < oString.length; x++) {
        strArray[x] = oString.charAt(x);
    }
    fromChar['a'] = '61';
    fromChar['b'] = '62';
    fromChar['c'] = '63';
    fromChar['d'] = '64';
    fromChar['e'] = '65';
    fromChar['f'] = '66';
    fromChar['g'] = '67';
    fromChar['h'] = '68';
    fromChar['i'] = '69';
    fromChar['j'] = '6A';
    fromChar['k'] = '6B';
    fromChar['l'] = '6C';
    fromChar['m'] = '6D';
    fromChar['n'] = '6E';
    fromChar['o'] = '6F';
    fromChar['p'] = '70';
    fromChar['q'] = '71';
    fromChar['r'] = '72';
    fromChar['s'] = '73';
    fromChar['t'] = '74';
    fromChar['u'] = '75';
    fromChar['v'] = '76';
    fromChar['w'] = '77';
    fromChar['x'] = '78';
    fromChar['y'] = '79';
    fromChar['z'] = '7A';
    fromChar['A'] = '41';
    fromChar['B'] = '42';
    fromChar['C'] = '43';
    fromChar['D'] = '44';
    fromChar['E'] = '45';
    fromChar['F'] = '46';
    fromChar['G'] = '47';
    fromChar['H'] = '48';
    fromChar['I'] = '49';
    fromChar['J'] = '4A';
    fromChar['K'] = '4B';
    fromChar['L'] = '4C';
    fromChar['M'] = '4D';
    fromChar['N'] = '4E';
    fromChar['O'] = '4F';
    fromChar['P'] = '50';
    fromChar['Q'] = '51';
    fromChar['R'] = '52';
    fromChar['S'] = '53';
    fromChar['T'] = '54';
    fromChar['U'] = '55';
    fromChar['V'] = '56';
    fromChar['W'] = '57';
    fromChar['X'] = '58';
    fromChar['Y'] = '59';
    fromChar['Z'] = '5A';
    fromChar['0'] = '30';
    fromChar['1'] = '31';
    fromChar['2'] = '32';
    fromChar['3'] = '33';
    fromChar['4'] = '34';
    fromChar['5'] = '35';
    fromChar['6'] = '36';
    fromChar['7'] = '37';
    fromChar['8'] = '38';
    fromChar['9'] = '39';
    fromChar['*'] = '2A';
    fromChar['/'] = '2F';
    fromChar['_'] = '5F';
    fromChar['+'] = '2B';
    fromChar['-'] = '2D';
    fromChar['@'] = '40';
    fromChar['.'] = '2E';
    for (var x = 0; x < strArray.length; x++) {
        strArray[x] = (strArray[x] == escape(strArray[x])) ? (fromChar[strArray[x]]) : escape(strArray[x]).replace(/%/, '');
    }
    return strArray.join('');
}

function completeHash(oString, oKey) {
    if (oKey.length < 3) {
        window.alert('The key must be at least 3 characters long');
        return oString;
    }
    var oKeyNum = new Array(),
        oOutStr = '',
        oOp = new Array('+=', '/=', '-=', '*= 0.01 *');
    for (var x = 0; x < oKey.length; x++) {
        oKeyNum[x] = parseInt('0x' + completeEscape(oKey.charAt(x)));
    }
    for (var x = 0, y = ''; x < oString.length; x += Math.round(oKey.length / 2), y = '+') {
        var theNum = parseInt('0x' + completeEscape(oString.substr(x, Math.round(oKey.length / 2))));
        if (isNaN(theNum)) {
            window.alert('Encryption failed!');
            return oString;
        }
        for (var z = 0; z < oKey.length; z++) {
            eval('theNum ' + oOp[z % 4] + ' ' + oKeyNum[z] + ';');
        }
        oOutStr += y + theNum;
    }
    return oOutStr;
}

function unHash(oString, oKey) {
    if (oKey.length < 3) {
        window.alert('The key must be at least 3 characters long');
        return oString;
    }
    var oKeyNum = new Array(),
        oOutStr = oString.split('+'),
        oOutStr2 = '',
        oOp = new Array('-=', '*=', '+=', '/= 0.01 *');
    for (var x = 0; x < oKey.length; x++) {
        oKeyNum[x] = parseInt('0x' + completeEscape(oKey.charAt(x)));
    }
    for (var x = 0; x < oOutStr.length; x++) {
        oOutStr[x] = parseFloat(oOutStr[x]);
        for (var z = oKey.length - 1; z >= 0; z--) {
            eval('oOutStr[x] ' + oOp[z % 4] + ' ' + oKeyNum[z] + ';');
        }
        oOutStr[x] = decToHex(Math.round(oOutStr[x]));
    }
    oOutStr = oOutStr.join('');
    for (x = 0; x < oOutStr.length; x += 2) {
        oOutStr2 += unescape('%' + oOutStr.substr(x, 2));
    }
    return oOutStr2;
}

function decToHex(oNum) {
    var hexChars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'),
        outP = '',
        d;
    for (var x = oNum; x > 0; x = (x - (x % 16)) / 16) {
        outP = hexChars[x % 16] + '' + outP;
    }
    if (outP.length % 2) {
        outP = '0' + outP;
    }
    return outP;
} 
