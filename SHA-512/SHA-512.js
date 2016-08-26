var hexcase = 0;
var b64pad = "";

function hex_sha512(s) {
    return rstr2hex(rstr_sha512(str2rstr_utf8(s)))
}

function b64_sha512(s) {
    return rstr2b64(rstr_sha512(str2rstr_utf8(s)))
}

function any_sha512(s, e) {
    return rstr2any(rstr_sha512(str2rstr_utf8(s)), e)
}

function hex_hmac_sha512(k, d) {
    return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)))
}

function b64_hmac_sha512(k, d) {
    return rstr2b64(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)))
}

function any_hmac_sha512(k, d, e) {
    return rstr2any(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)), e)
}

function sha512_vm_test() {
    return hex_sha512("abc").toLowerCase() == "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a" + "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f"
}

function rstr_sha512(s) {
    return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8))
}

function rstr_hmac_sha512(a, b) {
    var c = rstr2binb(a);
    if (c.length > 32) c = binb_sha512(c, a.length * 8);
    var d = Array(32),
        opad = Array(32);
    for (var i = 0; i < 32; i++) {
        d[i] = c[i] ^ 0x36363636;
        opad[i] = c[i] ^ 0x5C5C5C5C
    }
    var e = binb_sha512(d.concat(rstr2binb(b)), 1024 + b.length * 8);
    return binb2rstr(binb_sha512(opad.concat(e), 1024 + 512))
}

function rstr2hex(a) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0
    }
    var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var c = "";
    var x;
    for (var i = 0; i < a.length; i++) {
        x = a.charCodeAt(i);
        c += b.charAt((x >>> 4) & 0x0F) + b.charAt(x & 0x0F)
    }
    return c
}

function rstr2b64(a) {
    try {
        b64pad
    } catch (e) {
        b64pad = ''
    }
    var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var c = "";
    var d = a.length;
    for (var i = 0; i < d; i += 3) {
        var f = (a.charCodeAt(i) << 16) | (i + 1 < d ? a.charCodeAt(i + 1) << 8 : 0) | (i + 2 < d ? a.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > a.length * 8) c += b64pad;
            else c += b.charAt((f >>> 6 * (3 - j)) & 0x3F)
        }
    }
    return c
}

function rstr2any(a, b) {
    var c = b.length;
    var i, j, q, x, quotient;
    var d = Array(Math.ceil(a.length / 2));
    for (i = 0; i < d.length; i++) {
        d[i] = (a.charCodeAt(i * 2) << 8) | a.charCodeAt(i * 2 + 1)
    }
    var e = Math.ceil(a.length * 8 / (Math.log(b.length) / Math.log(2)));
    var f = Array(e);
    for (j = 0; j < e; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < d.length; i++) {
            x = (x << 16) + d[i];
            q = Math.floor(x / c);
            x -= q * c;
            if (quotient.length > 0 || q > 0) quotient[quotient.length] = q
        }
        f[j] = x;
        d = quotient
    }
    var g = "";
    for (i = f.length - 1; i >= 0; i--) g += b.charAt(f[i]);
    return g
}

function str2rstr_utf8(a) {
    var b = "";
    var i = -1;
    var x, y;
    while (++i < a.length) {
        x = a.charCodeAt(i);
        y = i + 1 < a.length ? a.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++
        }
        if (x <= 0x7F) b += String.fromCharCode(x);
        else if (x <= 0x7FF) b += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
        else if (x <= 0xFFFF) b += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        else if (x <= 0x1FFFFF) b += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F))
    }
    return b
}

function str2rstr_utf16le(a) {
    var b = "";
    for (var i = 0; i < a.length; i++) b += String.fromCharCode(a.charCodeAt(i) & 0xFF, (a.charCodeAt(i) >>> 8) & 0xFF);
    return b
}

function str2rstr_utf16be(a) {
    var b = "";
    for (var i = 0; i < a.length; i++) b += String.fromCharCode((a.charCodeAt(i) >>> 8) & 0xFF, a.charCodeAt(i) & 0xFF);
    return b
}

function rstr2binb(a) {
    var b = Array(a.length >> 2);
    for (var i = 0; i < b.length; i++) b[i] = 0;
    for (var i = 0; i < a.length * 8; i += 8) b[i >> 5] |= (a.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    return b
}

function binb2rstr(a) {
    var b = "";
    for (var i = 0; i < a.length * 32; i += 8) b += String.fromCharCode((a[i >> 5] >>> (24 - i % 32)) & 0xFF);
    return b
}
var sha512_k;

function binb_sha512(x, k) {
    if (sha512_k == undefined) {
        sha512_k = new Array(new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd), new int64(-1245643825, -330482897), new int64(-373957723, -2121671748), new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031), new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736), new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe), new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302), new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1), new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428), new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3), new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65), new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483), new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459), new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210), new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340), new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395), new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70), new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926), new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473), new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8), new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b), new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023), new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30), new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910), new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8), new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53), new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016), new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893), new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397), new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60), new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec), new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047), new int64(-1090935817, -1295615723), new int64(-965641998, -479046869), new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207), new int64(-354779690, -840897762), new int64(-176337025, -294727304), new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026), new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b), new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493), new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620), new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430), new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817))
    }
    var H = new Array(new int64(0x6a09e667, -205731576), new int64(-1150833019, -2067093701), new int64(0x3c6ef372, -23791573), new int64(-1521486534, 0x5f1d36f1), new int64(0x510e527f, -1377402159), new int64(-1694144372, 0x2b3e6c1f), new int64(0x1f83d9ab, -79577749), new int64(0x5be0cd19, 0x137e2179));
    var l = new int64(0, 0),
        T2 = new int64(0, 0),
        a = new int64(0, 0),
        b = new int64(0, 0),
        c = new int64(0, 0),
        d = new int64(0, 0),
        e = new int64(0, 0),
        f = new int64(0, 0),
        g = new int64(0, 0),
        h = new int64(0, 0),
        s0 = new int64(0, 0),
        s1 = new int64(0, 0),
        Ch = new int64(0, 0),
        Maj = new int64(0, 0),
        r1 = new int64(0, 0),
        r2 = new int64(0, 0),
        r3 = new int64(0, 0);
    var j, i;
    var W = new Array(80);
    for (i = 0; i < 80; i++) W[i] = new int64(0, 0);
    x[k >> 5] |= 0x80 << (24 - (k & 0x1f));
    x[((k + 128 >> 10) << 5) + 31] = k;
    for (i = 0; i < x.length; i += 32) {
        int64copy(a, H[0]);
        int64copy(b, H[1]);
        int64copy(c, H[2]);
        int64copy(d, H[3]);
        int64copy(e, H[4]);
        int64copy(f, H[5]);
        int64copy(g, H[6]);
        int64copy(h, H[7]);
        for (j = 0; j < 16; j++) {
            W[j].h = x[i + 2 * j];
            W[j].l = x[i + 2 * j + 1]
        }
        for (j = 16; j < 80; j++) {
            int64rrot(r1, W[j - 2], 19);
            int64revrrot(r2, W[j - 2], 29);
            int64shr(r3, W[j - 2], 6);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;
            int64rrot(r1, W[j - 15], 1);
            int64rrot(r2, W[j - 15], 8);
            int64shr(r3, W[j - 15], 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;
            int64add4(W[j], s1, W[j - 7], s0, W[j - 16])
        }
        for (j = 0; j < 80; j++) {
            Ch.l = (e.l & f.l) ^ (~e.l & g.l);
            Ch.h = (e.h & f.h) ^ (~e.h & g.h);
            int64rrot(r1, e, 14);
            int64rrot(r2, e, 18);
            int64revrrot(r3, e, 9);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;
            int64rrot(r1, a, 28);
            int64revrrot(r2, a, 2);
            int64revrrot(r3, a, 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;
            Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
            Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);
            int64add5(l, h, s1, Ch, sha512_k[j], W[j]);
            int64add(T2, s0, Maj);
            int64copy(h, g);
            int64copy(g, f);
            int64copy(f, e);
            int64add(e, d, l);
            int64copy(d, c);
            int64copy(c, b);
            int64copy(b, a);
            int64add(a, l, T2)
        }
        int64add(H[0], H[0], a);
        int64add(H[1], H[1], b);
        int64add(H[2], H[2], c);
        int64add(H[3], H[3], d);
        int64add(H[4], H[4], e);
        int64add(H[5], H[5], f);
        int64add(H[6], H[6], g);
        int64add(H[7], H[7], h)
    }
    var m = new Array(16);
    for (i = 0; i < 8; i++) {
        m[2 * i] = H[i].h;
        m[2 * i + 1] = H[i].l
    }
    return m
}

function int64(h, l) {
    this.h = h;
    this.l = l
}

function int64copy(a, b) {
    a.h = b.h;
    a.l = b.l
}

function int64rrot(a, x, b) {
    a.l = (x.l >>> b) | (x.h << (32 - b));
    a.h = (x.h >>> b) | (x.l << (32 - b))
}

function int64revrrot(a, x, b) {
    a.l = (x.h >>> b) | (x.l << (32 - b));
    a.h = (x.l >>> b) | (x.h << (32 - b))
}

function int64shr(a, x, b) {
    a.l = (x.l >>> b) | (x.h << (32 - b));
    a.h = (x.h >>> b)
}

function int64add(a, x, y) {
    var b = (x.l & 0xffff) + (y.l & 0xffff);
    var c = (x.l >>> 16) + (y.l >>> 16) + (b >>> 16);
    var d = (x.h & 0xffff) + (y.h & 0xffff) + (c >>> 16);
    var e = (x.h >>> 16) + (y.h >>> 16) + (d >>> 16);
    a.l = (b & 0xffff) | (c << 16);
    a.h = (d & 0xffff) | (e << 16)
}

function int64add4(e, a, b, c, d) {
    var f = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
    var g = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (f >>> 16);
    var h = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (g >>> 16);
    var i = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (h >>> 16);
    e.l = (f & 0xffff) | (g << 16);
    e.h = (h & 0xffff) | (i << 16)
}

function int64add5(f, a, b, c, d, e) {
    var g = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
    var h = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (g >>> 16);
    var i = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (h >>> 16);
    var j = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (i >>> 16);
    f.l = (g & 0xffff) | (h << 16);
    f.h = (i & 0xffff) | (j << 16)
}
