function playerInit() {
  var song;
  var tracker = $('.tracker');
  var volume = $('.volume');

  function initAudio(elem) {
    var url = elem.attr('audiourl');

    var title = elem.text();
    var artist = elem.attr('artist');

    $('.player .title').text(title);
    $('.player .artist').text(artist);

    // song = new Audio('media/'+url);
    song = new Audio(url);

    // timeupdate event listener
    song.addEventListener('timeupdate', function () {
      var curtime = parseInt(song.currentTime, 10);
      tracker.slider('value', curtime);
    });

    $('.playlist li').removeClass('active');
    elem.addClass('active');
  }

  function playAudio() {
    song.play();

    tracker.slider("option", "max", song.duration);

    $('.play').addClass('hidden');
    $('.pause').addClass('visible');
  }

  function stopAudio() {
    song.pause();
    song.currentTime = 0;
    song.duration = 0;

    $('.play').removeClass('hidden');
    $('.pause').removeClass('visible');
  }

  // play click
  $('.play').click(function (e) {
    e.preventDefault();
    // playAudio();

    showDuration(song);

    song.addEventListener('ended', function () {
      var next = $('.playlist li.active').next();
      if (next.length == 0) {
        next = $('.playlist li:first-child');
      }
      initAudio(next);

      song.addEventListener('loadedmetadata', function () {
        playAudio();
      });

    }, false);

    tracker.slider("option", "max", song.duration);
    song.play();
    $('.play').addClass('hidden');
    $('.pause').addClass('visible');

  });

  // pause click
  $('.pause').click(function (e) {
    e.preventDefault();
    stopAudio();
  });

  // next track
  $('.fwd').click(function (e) {
    e.preventDefault();

    stopAudio();

    var next = $('.playlist li.active').next();
    if (next.length === 0) {
      next = $('.playlist li:first-child');
    }
    initAudio(next);
    song.addEventListener('loadedmetadata', function () {
      playAudio();
    });
  });

  // prev track
  $('.rew').click(function (e) {
    e.preventDefault();

    stopAudio();

    var prev = $('.playlist li.active').prev();
    if (prev.length === 0) {
      prev = $('.playlist li:last-child');
    }
    initAudio(prev);
    song.addEventListener('loadedmetadata', function () {
      playAudio();
    });
  });

  // playlist elements - click
  $('.playlist li').click(function () {
    stopAudio();
    initAudio($(this));
  });

  // initialization - first element in playlist
  initAudio($('.playlist li:first-child'));

  song.volume = 0.8;

  volume.slider({
    orientation: 'vertical',
    range: 'max',
    max: 100,
    min: 1,
    value: 80,
    start: function (event, ui) {
    },
    slide: function (event, ui) {
      song.volume = ui.value / 100;
    },
    stop: function (event, ui) {
    }
  });

  $('.volumeIcon').click(function (e) {
    e.preventDefault();
    $('.volume').toggleClass('show');
  });

  // empty tracker slider
  tracker.slider({
    range: 'min',
    min: 0,
    max: 10,
    start: function (event, ui) {
    },
    slide: function (event, ui) {
      song.currentTime = ui.value;
    },
    stop: function (event, ui) {
    }
  });

  //Time/Duration
  function showDuration(audio) {
    $(audio).bind('timeupdate',function(){
      //Get hours and minutes
      var s = parseInt(audio.currentTime % 60);
      var m = parseInt(audio.currentTime / 60) % 60;

      var sDuration = parseInt(audio.duration % 60);
      var mDuration = parseInt(audio.duration / 60) % 60;

      if(sDuration < 10){
        sDuration = '0'+ sDuration;
      }

      if(m < 10){
        m = '0'+ m;
      }

      if(mDuration < 10){
        mDuration = '0'+ mDuration;
      }

      if(sDuration < 10){
        sDuration = '0'+ sDuration;
      }

      $('#duration').html(m + ':'+ s + '  /  ' + mDuration + ':'+ sDuration);

      var value = 0;
      if(audio.currentTime > 0){
        value = Math.floor((100 / audio.duration) * audio.currentTime);
      }

      $('#progress').css('width',value+'%');

      if(value == 99) {
        stopAudio();
        $('#progress').css('width', 0+'%');
        $('#duration').html('00:00' + '  /  00:00');
      }
    });
  }

  const btnBackHome = $('#btn-back-home');
  btnBackHome.on('click', function () {
    stopAudio();
  });
}

/*$(function () {
  init();
});*/

var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
$("#showPopupNotification").click(function () {
  popupNotification.show("You are playing " + title);
});