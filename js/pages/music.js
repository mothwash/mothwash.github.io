$(document).ready(function() {

  let currentMusic = 0;

  const music = document.querySelector('#audio');

  const seekBar = document.querySelector('.seek-bar');
  const songName = document.querySelector('.music-name');
  const artistName = document.querySelector('.artist-name');
  const disk = document.querySelector('.disk');
  const currentTime = document.querySelector('.current-time');
  const musicDuration = document.querySelector('.song-duration');
  const playBtn = document.querySelector('.play-btn');
  const forwardBtn = document.querySelector('.forward-btn');
  const backwardBtn = document.querySelector('.backward-btn');


  // setup music

  const setMusic = (i) => {
      seekBar.value = 0; // set range slide value to 0;
      let song = songs[i];
      currentMusic = i;
      music.src = song.path;

      songName.innerHTML = song.name;
      artistName.innerHTML = song.artist;
      disk.style.backgroundImage = `url('${song.cover}')`;

      currentTime.innerHTML = '00:00';
      setTimeout(() => {
          seekBar.max = music.duration;
          musicDuration.innerHTML = formatTime(music.duration);
      }, 300);
  }



  // formatting time in min and seconds format

  const formatTime = (time) => {
      let min = Math.floor(time / 60);
      if(min < 10){
          min = `0${min}`;
      }
      let sec = Math.floor(time % 60);
      if(sec < 10){
          sec = `0${sec}`;
      }
      return `${min} : ${sec}`;
  }



  //playBtn.addEventListener('click', () => {
  playBtn.addEventListener('click', function() {
      if(playBtn.className.includes('pause')){
          music.play();
      } else{
          music.pause();
      }
      playBtn.classList.toggle('pause');
      disk.classList.toggle('play');
  })



  // seek bar
  setInterval(() => {
      seekBar.value = music.currentTime;
      currentTime.innerHTML = formatTime(music.currentTime);
  }, 500)



  seekBar.addEventListener('change', function() {
      music.currentTime = seekBar.value;
  })


  function checkActive(activesongs, currentMusic, inlist) {
    for (activecount=0; activecount<activesongs.length; activecount++) {
      if (activesongs[activecount].style.display != 'none') {
        if (songs[currentMusic].name == activesongs[activecount].textContent) {
          inlist = true
        }
      }
    }
    return inlist
  }


  // forward and backward button
  forwardBtn.addEventListener('click', function() {
      var inlist = null
      var activesongs = songlist.children

      while (inlist == null) {
        inlist = checkActive(activesongs, currentMusic+1, inlist)
        if(currentMusic >= songs.length - 1){
            currentMusic = 0;
        } else{
            currentMusic++;
        }
      }

      setMusic(currentMusic);
      playMusic();

  })

  backwardBtn.addEventListener('click', function() {
      var inlist = null
      var activesongs = songlist.children

      while (inlist == null) {
        inlist = checkActive(activesongs, currentMusic-1, inlist)
        if(currentMusic <= 0){
            currentMusic = songs.length - 1;
        } else{
            currentMusic--;
        }
      }

      setMusic(currentMusic);
      playMusic();
  })



  const playMusic = () => {
      music.play();
      playBtn.classList.remove('pause');
      disk.classList.add('play');
  }

  const pauseMusic = () => {
      music.pause();
      playBtn.classList.remove('play');
      disk.classList.add('pause');
  }

  setInterval(() => {
      seekBar.value = music.currentTime;
      currentTime.innerHTML = formatTime(music.currentTime);
      if (Math.floor(music.currentTime) != 0) {
        if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
            forwardBtn.click();
        }
      }
  }, 500)


  // add songs
  const songlist = document.querySelector('.song-list');
  for (i=1; i<songs.length; i++) {
    var songlisting = document.createElement('li');
    songlisting.textContent = songs[i].name;
    songlisting.classList.add('songlisting')
    songlist.appendChild(songlisting);
  }


  // click on song
  songlist.addEventListener('click', function(e) {
    if (e.classList = "songlisting") {
      for (i=0; i<songs.length; i++) {
        if (songs[i].name == e.target.textContent) {
          setMusic(i);
        }
      }
    }
  })

  //shuffle
  const shuffle_btn = document.querySelector(".shuffle-btn")
  const songlistings = document.querySelector(".songlisting")
  shuffle_btn.addEventListener('click', function(e) {
    var m = songs.length, t, i;
    // shuffle songs
    while (m) {

      i = Math.floor(Math.random() * m--);

      t = songs[m]
      songs[m] = songs[i]
      songs[i] = t

    }
    setMusic(1)

  })

  // vi's songs

  function tellemitsV(heartBtn) {
    if (heartBtn.className.includes('off')) {
      var notice = document.createElement('h2')
      var logo = document.querySelector('.logo')
      var musicplayer = document.querySelector('.music-player')
      var musicbody = document.querySelector('.musicbody')
      notice.setAttribute('id','notice')
      notice.textContent = "inspired by V, by love and meaning"
      //menu.insertBefore(notice, homemenu)
      musicplayer.style.paddingTop = "600px"
      musicplayer.style.height = "1400px"
      musicbody.style.height = "1600px"
      logo.appendChild(notice)
    } else {
      var notice = document.querySelector('#notice')
      var musicplayer = document.querySelector('.music-player')
      var musicbody = document.querySelector('.musicbody')
      musicplayer.style.paddingTop = "215px"
      musicplayer.style.height = "1000px"
      musicbody.style.height = "1200px"
      notice.remove()
    }
  }


  const heartBtn = document.querySelector('.heart-btn')
  heartBtn.addEventListener('click', function() {
    // need like an on/off class add
    // fix the songlist too, i.e. deleting, adding elements
    if (heartBtn.className.includes('off')){
      tellemitsV(heartBtn)
      heartBtn.classList.remove('off')
      heartBtn.classList.add('on')
      var firstsong = null
      for (songnum=1; songnum<songs.length; songnum++) {
        song = songs[songnum]
        if (song.vibin == 0) {
          for (elemnum=0; elemnum<songs.length-1; elemnum++) {
            elem = songlist.children[elemnum]
            if (elem.textContent == song.name) {
              elem.style.display = 'none'
            }
          }
          // elem = songlist.getElementsByTagName('li')[songnum-1]
          // elem.style.display = 'none'
        } else {
          if (firstsong == null) {
            firstsong = songnum
          }
        }
      }
      setMusic(firstsong)
    } else {
      tellemitsV(heartBtn)
      heartBtn.classList.remove('on');
      heartBtn.classList.add('off');
      for (songnum=1; songnum<songs.length; songnum++){
        song = songs[songnum]
        if (song.vibin == 0) {
          for (elemnum=0; elemnum<songs.length-1; elemnum++) {
            elem = songlist.children[elemnum]
            if (elem.textContent == song.name) {
              elem.style.display = 'initial'
            }
          }
        }
      }
      setMusic(1)
    }

  })


});
