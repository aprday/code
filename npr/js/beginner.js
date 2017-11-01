var app = angular.module('myApp', []),
    apiKey = 'MDE5OTI4NDM5MDE0MzczNzA1NzhjMzNlYQ001', 
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON'; 


app.factory('visualizator', ['audio','canvas','$rootScope', function(audio, canvas){
  
  var Visualizator = function(audio,canvas,fftSize){
    
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
  
    
    
  };
  
  Visualizator.prototype.reset = function(fftSize){
	this.analyser.fftSize = fftSize;
	this.bufferLength = this.analyser.frequencyBinCount;
	this.dataArray = new Uint8Array(this.bufferLength);
}

Visualizator.prototype.looper = function(canvasCtx,WIDTH,HEIGHT){
	
	
	
	//Creating a waveform/oscilloscope
	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
	canvasCtx.fillStyle = '#FFFFFF';
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
	canvasCtx.fillStyle = '#FFFFFF';
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
	
};

var visualizator = new Visualizator(audio,canvas,512);


return visualizator;

}]);

app.factory('canvas', ['$document', function($document) {
  var canvas = $document[0].getElementById('waves');
  
  return canvas;
}]);

app.factory('player', ['audio', 'visualizator','$rootScope',  function(audio,visualizator, $rootScope) {
  var player = {
    
    current: null,
    progress: 0,
    playing: false,
    title: '',
    
    play: function(program){
      console.log(program);
      if(program !== undefined){
        if (player.playing)
        player.stop();
        
        console.log(program.audio[0].format.mp4);

        var url = program.audio[0].format.mp4.$text;
        player.current = program;
        audio.src = url;
        
        player.title = program.title.$text;
        
        console.log(player.title);
        
      }
      audio.play();
      player.playing = true;
      visualizator.draw();
      
    },
    stop: function() {
      if (player.playing) {
        audio.pause();
        player.playing = false;
        player.current = null;
      }
    },
    currentTime: function() {
      return audio.currentTime;
    },
    currentDuration: function() {
      return parseInt(audio.duration);
    }
  };
  audio.addEventListener('timeupdate', function(evt) {
    $rootScope.$apply(function() {
      player.progress = player.currentTime();
      player.progress_percent = (player.progress / player.currentDuration()) * 100;
    });
  });
  audio.addEventListener('ended', function() {
    $rootScope.$apply(player.stop());
  });
  audio.addEventListener('canplay', function() {
    $rootScope.$apply(function() {
      player.ready = true;
    });
  });
  return player;
}]);

app.factory('audio', ['$document', function($document) {
  var audio = $document[0].getElementById('source');
  audio.src = './media/npr.mp3';
  return audio;
}]);

app.directive('nprLink', function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      player: '='
    },
    templateUrl: '/views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
      if (scope.ngModel.image) {
        scope.thumbnail = scope.ngModel.image[0].src;
      }
    }
  }
});

app.directive('playerView', [function(){
  
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    scope: {
      ngModel: '='
    },
    templateUrl: '/views/playerView.html',
    link: function(scope, iElm, iAttrs, controller) {
      scope.$watch('ngModel.current', function(newVal) {
        if (newVal) {
          scope.playing = true;
          scope.duration = parseInt(scope.ngModel.current.audio[0].duration.$text);
          scope.title = scope.ngModel.current.title.$text;
          scope.secondsProgress = 0;
          scope.percentComplete = 0;

          var updateClock = function() {
            if (scope.secondsProgress >= scope.duration || !scope.playing) {
              scope.playing = false;
              clearInterval(timer);
            } else {
              scope.secondsProgress = scope.ngModel.currentTime();
              scope.percentComplete = scope.secondsProgress / scope.duration;
            }
          };
          var timer = setInterval(function() { scope.$apply(updateClock); }, 500);
          updateClock();
        }
      });
      scope.stop = function() {
        scope.ngModel.stop();
        scope.playing = false;
      }
    }
  };
}]);

app.factory('nprService', ['$http', function($http) {
    var doRequest = function(apiKey) {
      return $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
      });
    }

    return {
      programs: function(apiKey) { return doRequest(apiKey); }
    };
  }]);

app.controller('PlayerController', ['$scope', '$http', 'player', function($scope, $http, player) {
  $scope.player = player;

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    // $scope.programs = data.list.story;
    $scope.programs = [];
    angular.forEach(data.list.story, function(story) {
      if (story.audio[0].format && story.audio[0].format.mp4) {
        console.log(story);
        $scope.programs.push(story);
      }
    });
  }).error(function(data, status) {
  });
}]);

app.controller('RelatedController', ['player','$scope', '$http',  function(player, $scope, $http) {
  
  $scope.player = player;
  
  $scope.$watch('player.current', function(newVal) {
    console.log("aaaaaaaaaaaaaaaaa"+newVal);
    if (newVal) {
      $scope.related = [];
      angular.forEach(newVal.relatedLink, function(link) {
        $scope.related.push({link: link.link[0].$text, caption: link.caption.$text});
      });
    }
  });
}]);

// Parent scope
app.controller('FrameController', function($scope) {
});