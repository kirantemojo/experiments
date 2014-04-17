window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
             window.MozBlobBuilder || window.MSBlobBuilder;
window.URL = window.URL || window.webkitURL;
window.onload = function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','assets/html5',true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e){
        if(this.status === 200)
        {
            var blob = new Blob([this.response], {type: 'image/png'});
            var img = document.createElement('img');
                img.onload = function(e) {
                  window.URL.revokeObjectURL(img.src); 
                };
                img.src = window.URL.createObjectURL(blob);
                document.querySelector('.workers').appendChild(img);

            var bytes = new Uint8Array(this.response);
            var bytesLength = new Uint8ClampedArray(this.response);

            var img = document.createElement('img');
            img.src = 'data:image/png;base64,'+encode(bytes);
            document.querySelector('.workers').appendChild(img);
        }
    }
    xhr.send();
}
function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
