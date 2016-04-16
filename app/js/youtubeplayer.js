'use strict';

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: '5xORcZ3I7hA',
      playerVars: {
        autoplay:1,
        controls: 0,
        playsinline: 0
      }
      // events: {
      //   'onReady': onPlayerReady
      //   //'onStateChange': onPlayerStateChange
      // }
    })
  }

  // function onPlayerReady(event) {
  //   event.target.playVideo();
  // }

  // var done = false;
  // function onPlayerStateChange(event) {
  //   if(event.data == YT.PlayerState.PLAYING && !done) {
  //     setTimeout(stopVideo, 6000);
  //     done = true;
  //   }
  // }
  //
  // function stopVideo() {
  //   player.stopVideo();
  // }
