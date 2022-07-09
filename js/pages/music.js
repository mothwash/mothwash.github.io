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




  // forward and backward button
  forwardBtn.addEventListener('click', function() {
      if(currentMusic >= songs.length - 1){
          currentMusic = 0;
      } else{
          currentMusic++;
      }
      setMusic(currentMusic);
      playMusic();
  })

  backwardBtn.addEventListener('click', function() {
      if(currentMusic <= 0){
          currentMusic = songs.length - 1;
      } else{
          currentMusic--;
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
      if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
          forwardBtn.click();
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



});
