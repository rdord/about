(function (window, document, undefined) {
  'use strict';

  var mediaQuery = window.matchMedia('(min-width: 640px)');
  mediaQuery.addListener(insertYoutubeScript);
  
  function insertYoutubeScript(mediaQuery) {    
    if (mediaQuery.matches) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } 
  }
  
  insertYoutubeScript(mediaQuery);
  
})(window, document);





var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'E5ZDxCFM3nk',
    playerVars: { 'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}



function timestampReached() {
   $('.column--primary h1').addClass('shake-little');
   setTimeout(()=>{$('.column--primary h1').removeClass('shake-little')}, 1000);
   setTimeout(()=>{$('.column--primary h1').addClass('shake-hard')}, 1140);
   setTimeout(()=>{$('.column--primary h1').removeClass('shake-hard')}, 1300);
   setTimeout(()=>{$('.column--primary h1, .name').addClass('shake-crazy')}, 1600);
   setTimeout(()=>{$('.column--primary h1, .name').removeClass('shake-crazy')}, 1800);
}

var timestamp = 3;
var timer;
 
function timestampCallback() {
    clearTimeout(timer);
         
    var currentTime = player.getCurrentTime();
    var remainingTime = timestamp - currentTime;
    if (remainingTime > 0) {
      timer = setTimeout(timestampReached, remainingTime * 1000);
    }    
}

function onPlayerReady(event) {
  event.target.playVideo();

  //pause video (for page styling)
  // setTimeout(()=>{event.target.pauseVideo()}, 500);
}

var done = false;

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && done === false) {
    timestampCallback();
    done = true;
  }
  if (event.data === YT.PlayerState.ENDED) {
      player.playVideo(); 
  }
}
