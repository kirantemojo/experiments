var ctx; //audio context 
var buf; //audio buffer 
var fft; //fft audio node 
var samples = 1024; 
var SMOOTHING = 0.8;
var setup = false; //indicate if audio is set up yet 
var WIDTH = 1024;
var HEIGHT = 460;
 
 
//init the sound system 
function init() { 
    console.log("in init"); 
    try { 
        ctx = new webkitAudioContext();
        $('#small').html('Loading...'); //is there a better API for this? 
        setupCanvas(); 
        loadFile(); 
    } catch(e) { 
        alert('you need webaudio support' + e); 
    } 
} 
window.addEventListener('load',init,false); 
 
//load the mp3 file 
function loadFile() { 
    var req = new XMLHttpRequest(); 
    req.open("GET","assets/Dooriyan.mp3",true); 
    //we can't use jquery because we need the arraybuffer type 
    req.responseType = "arraybuffer";
    req.onprogress = function(e){
            if(e.lengthComputable)
            {
                var percent = e.loaded/e.total;
                $('#small').html('Loading '+Math.round(percent*100)+'% Please Wait...');
            }
        }; 
    req.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req.response, function(buffer) { 
            buf = buffer; 
            play(); 
        });
        $('#small').html('Audio Visualization'); 
    }; 
    req.send(); 
} 

function play() { 
    //create a source node from the buffer 
    var src = ctx.createBufferSource();  
    src.buffer = buf; 
     
    //create fft 
    fft = ctx.createAnalyser(); 
    fft.fftSize = samples; 
    fft.smoothingTimeConstant = SMOOTHING;
     
    //connect them up into a chain 
    src.connect(fft); 
    fft.connect(ctx.destination); 
     
    //play immediately 
    src.noteOn(0); 
    setup = true; 
} 

var gfx; 
function setupCanvas() { 
	var canvas = document.querySelector('canvas');
	var drawContext = canvas.getContext('2d');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
    gfx = canvas.getContext('2d'); 
    webkitRequestAnimationFrame(update); 
} 

function update() { 
    webkitRequestAnimationFrame(update); 
    if(!setup) return; 
    gfx.clearRect(0,0,WIDTH,HEIGHT); 
     
    var data = new Uint8Array(samples); 
    fft.getByteFrequencyData(data); 
    // gfx.fillStyle = 'red'; 
    // for(var i=0; i<data.length; i++) { 
    //     gfx.fillRect(100+i*4,100+256-data[i]*2,3,100); 
    // } 

// Draw the frequency domain chart.
  for (var i = 0; i < fft.frequencyBinCount; i++) {
    var value = data[i];
    var percent = value / 256;
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH/fft.frequencyBinCount;
    var hue = i/fft.frequencyBinCount * 160;
    gfx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    gfx.fillRect(i * barWidth, offset, barWidth, height);
  }

  // Draw the time domain chart.
  for (var i = 0; i < fft.frequencyBinCount; i++) {
    var value = data[i];
    var percent = value / 256;
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH/fft.frequencyBinCount;
    gfx.fillStyle = 'black';
    gfx.fillRect(i * barWidth, offset, 1, 2);
  }
     
}