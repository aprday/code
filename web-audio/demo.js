function Visualizator(audio,canvas,fftSize){
	//To extract data from your audio source, you need an AnalyserNode,
	// which is created using the AudioContext.createAnalyser()
	this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	this.analyser = this.audioCtx.createAnalyser();
	
	//This node is then connected to your audio source:
	this.source = this.audioCtx.createMediaElementSource(audio);
	this.source.connect(this.analyser);
	this.analyser.connect(this.audioCtx.destination);
	
	 // set up the data
	this.analyser.fftSize = fftSize;
	this.bufferLength = this.analyser.frequencyBinCount;
	this.dataArray = new Uint8Array(this.bufferLength);
	
	//create canvasCtx
	this.canvasCtx = canvas.getContext("2d");
	
	this.WIDTH = canvas.width;
	this.HEIGHT = canvas.height;
	this.audio = audio;
	this.canvas = canvas;
}

Visualizator.prototype.reset = function(fftSize){
	this.analyser.fftSize = fftSize;
	this.bufferLength = this.analyser.frequencyBinCount;
	this.dataArray = new Uint8Array(this.bufferLength);
}

Visualizator.prototype.looper = function(canvasCtx,WIDTH,HEIGHT){
	
	
	
	//Creating a waveform/oscilloscope
	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
	canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
	  
	canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();
	 
	 
	 //build lines
	 var sliceWidth = WIDTH * 1.0 / this.bufferLength;
      var x = 0;
	  
	  for(var i = 0; i < this.bufferLength; i++) {
   
        var v = this.dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }
	  
	  canvasCtx.lineTo(WIDTH, HEIGHT/2);
      canvasCtx.stroke();
	  
	  
	  //build rander
	  var barWidth = (WIDTH / this.bufferLength) * 2.5;
      var barHeight;
      var o = 0;
	  
	 for(var i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i]/2;

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(o,HEIGHT-barHeight/2,barWidth,barHeight);

        o += barWidth + 1;
      }
}

Visualizator.prototype.rander= function(canvasCtx,WIDTH,HEIGHT){
	//Creating a waveform/oscilloscope
	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
	canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.beginPath();
	 
	 var barWidth = (WIDTH / this.bufferLength) * 2.5;
      var barHeight;
      var x = 0;
	  
	 for(var i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i]/2;

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

        x += barWidth + 1;
      }
};

Visualizator.prototype.draw = function(){
	
	
		//update data
	this.analyser.getByteTimeDomainData(this.dataArray);
	
	this.rander(this.canvasCtx,this.WIDTH,this.HEIGHT);
	this.looper(this.canvasCtx,this.WIDTH,this.HEIGHT);
		
	
	
	
	
	var self = this;
	
	this.drawVisual = requestAnimationFrame(function(){
		
		self.draw();
	});
	
}

var visualizator;

var create = function(){
	var canvas = document.getElementById("waves");

	var audio = document.getElementById("source");
	
	console.log(canvas.width+"    "+canvas.height);
	
	 visualizator = new Visualizator(audio,canvas,1024);
	
	visualizator.draw();

}

create();


var select = function(value){
	
	console.log(value);
	visualizator.reset(value);
}