
//将Ansi编码字符串转换成Base64编码的字符串
function encode64(ansi_string) {
	var base64_string = "";
	var chr1,
		chr2,
		chr3 = "";
	var enc1,
		enc2,
		enc3,
		enc4 = "";
	var i = 0;
	do {
		chr1 = ansi_string.charCodeAt(i++);
		chr2 = ansi_string.charCodeAt(i++);
		chr3 = ansi_string.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		base64_string = base64_string + keyStr.charAt(enc1) + keyStr.charAt(enc2)
		+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < ansi_string.length);
	return base64_string;
}


//将Base64编码字符串转换成Ansi编码的字符串
export function decode64(base64_string) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var ansi_string = "";
	var chr1,
		chr2,
		chr3 = "";
	var enc1,
		enc2,
		enc3,
		enc4 = "";
	var i = 0;
	if (base64_string.length % 4 != 0) {
		return "";
	}
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(base64_string)) {
		return "";
	}
	do {
		enc1 = keyStr.indexOf(base64_string.charAt(i++));
		enc2 = keyStr.indexOf(base64_string.charAt(i++));
		enc3 = keyStr.indexOf(base64_string.charAt(i++));
		enc4 = keyStr.indexOf(base64_string.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;


		ansi_string = ansi_string + String.fromCharCode(chr1);
		if (enc3 != 64) {
			ansi_string += String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			ansi_string += String.fromCharCode(chr3);
		}
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < base64_string.length);
	return ansi_string;
}


export function utf16to8(str) {
	var out,
		i,
		len,
		c;


	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}


export function utf8to16(str) {
	var out,
		i,
		len,
		c;
	var char2,
		char3;


	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			out += str.charAt(i - 1);
			break;
		case 12:
		case 13:
			// 110x xxxx   10xx xxxx
			char2 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			// 1110 xxxx  10xx xxxx  10xx xxxx
			char2 = str.charCodeAt(i++);
			char3 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x0F) << 12) |
				((char2 & 0x3F) << 6) |
				((char3 & 0x3F) << 0));
			break;
		}
	}
	return out;
}
