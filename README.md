# cryptography-killerpacks
Encrypt - Decrypt, Assymetric - Symmetric, Encode - Decode, &amp; Hash Pack

## How to use ROT-13
<h3> Encrypt </h3>
rot13("string")

## How to use BASE-64
<h3> Encode </h3>
ebase("plaintext")

<h3> Decode </h3>
dbase("cipher")

## How to use CHINZO-72C & ARABICA2RS
<h3> Encode </h3>
_encode("plaintext")

<h3> Decode </h3>
_decode("cipher")

## How to use AER-256 & ARMON-64
<h3> Encrypt </h3>
completeHash("string", "salt")

<h3> Decrypt </h3>
unHash("cipher", "salt")

## How to use ATOM-128
<h3> Encrypt </h3>
a128e("string")

<h3> Decrypt </h3>
a128("cipher")

## How to use SHA-512
<h3> Hash </h3>
hex_sha512("string")

#Logs
<p> - Add Chinzo-72 (25-08-2016) </p>
<p> - Add Arabica2RS (25-08-2016) </p>
<p> - Add AER-256 (25-08-2016) </p>
<p> - Add SHA-512 (26-08-2016) </p>
<p> - Add ARMON-64 (26-08-2016) </p>
<p> - Add ATOM-128 (26-08-2016) </p>
<p> - Add BASE-64 (26-08-2016) </p>
<p> - Add ROT-13 (26-08-2016) </p>

-------------------------------------------
MIT License

Copyright (c) 2016-2020 Gun Gun Febrianza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
