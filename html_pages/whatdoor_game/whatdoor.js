var challenge = 0;
var revolutionarysupport = 0;
var riddlecounter = 0;
const assignment = Math.random()

// start game function
function start_game() {
  //const assignment = Math.random();

  console.log('assignment is: ',assignment)
  if (assignment < 0.4) {
    console.log('masses')
    start_masses();
  }
  if (assignment >= 0.4 && assignment < 0.7) {
    console.log('sabateurs')
    start_sabateurs();
  }
  if (assignment >= 0.7 && assignment < 0.9) {
    console.log('revolutionaries')
    start_revolutionaries();
  }
  if (assignment >= 0.9 && assignment < 1) {
    console.log('protagonists')
    start_protagonists();
  }
}

function addEventListenerByID(id, eventType, fn) {
  var elem = document.getElementById(id);
  elem.addEventListener(eventType, fn, false);
}

// clear start game box
function clear_startgame_box() {
  var startbutton = document.querySelector('#startgame');
  startbutton.classList.add('transform-invisibility');
  startbutton.removeEventListener("click", start_game);

}

function clear_allgametext() {
  var gametext = document.querySelector("#gametext");
  var textchildren = gametext.children;
  var textchildren_count = textchildren.length
  console.log('textchildren are: ',textchildren)
  for (var i=0; i<textchildren_count; i++) {
    textchildren[0].remove();
  }
}

function read_revolutionaries(entryID) {
  var gametext = document.querySelector('#gametext');
  for (var i=0; i<revolutionaries.length; i++) {
    if (revolutionaries[i].entry == entryID) {
      var revolutionariestext = revolutionaries[i].text;
      for (var j=0; j<revolutionariestext.length; j++) {
        var line = document.createElement('p');
        line.textContent = revolutionariestext[j];
        line.classList.add("narration");
        line.classList.toggle('transform-visibility');
        gametext.appendChild(line)
      }
    }
  }
}


function start_revolutionaries_5() {
  if (revolutionarysupport == 3) {
    clear_allgametext();
    read_revolutionaries(5);
  } else {
    var gametext = document.querySelector('#gametext');
    var line = document.createElement('p');
    line.textContent = "open a door before continuing"
    line.classList.add('narration');
    line.classList.toggle('transform-visibility');
    gametext.appendChild(line);
  }
}

function start_revolutionaries_4() {
  if (revolutionarysupport == 2) {
    clear_allgametext();
    read_revolutionaries(4);
    var gametext = document.querySelector('#gametext');
    createNextbutton(gametext, start_revolutionaries_5)
  } else {
    var gametext = document.querySelector('#gametext');
    var line = document.createElement('p');
    line.textContent = "open a door before continuing"
    line.classList.add('narration');
    line.classList.toggle('transform-visibility');
    gametext.appendChild(line);
  }
}

function start_revolutionaries_3() {
  if (revolutionarysupport == 1) {
    clear_allgametext();
    read_revolutionaries(3);
    var gametext = document.querySelector('#gametext');
    createNextbutton(gametext, start_revolutionaries_4)
  } else {
    var gametext = document.querySelector('#gametext');
    var line = document.createElement('p');
    line.textContent = "open a door before continuing"
    line.classList.add('narration');
    line.classList.toggle('transform-visibility');
    gametext.appendChild(line);
  }
}

function submitdoor() {
  var doorinput = document.querySelector('#doorselection');
  revolutionarysupport += 1;
  for (var i = 0; i<doors.length; i++) {
    if (doorinput.value == doors[i].doornum) {
      var effect = doors[i].effect
      if (effect == "evict") {
        var gametext = document.querySelector("#gametext");
        var line = document.createElement('p');
        line.textContent = "you hear great danger on the other side of this door"
        line.classList.add("narration");
        line.classList.toggle('transform-visibility');
        gametext.appendChild(line)
        var rand = Math.random();
        if (rand <= doors[i].quantity) {
          window.location.replace('whatdoor_term.html')
        }
      }
      if (effect == "challenge") {
        challenge += doors[i].quantity
        var gametext = document.querySelector("#gametext");
        var line = document.createElement('p');
        line.textContent = "the challenge has increased"
        line.classList.add("narration");
        line.classList.toggle('transform-visibility');
        gametext.appendChild(line)
      }
      if (effect == "erase") {
        var gametext = document.querySelector("#gametext");
        var textchildren = gametext.children;
        var textchildren_count = textchildren.length - 1
        console.log(
          'textchildren_count is: ', textchildren_count
        )
        var erase_qty = doors[i].quantity
        console.log('textchildren are: ',textchildren)
        try {
          for (var j=0; j<textchildren_count; i++) {
            var rand = Math.random();
            //console.log('rand is: ',rand');
            if (rand < erase_qty) {
              textchildren[0].remove();
            }
          }
        } catch {
          var line = document.createElement('p');
          line.textContent = "important information is being forgotten"
          line.classList.add("narration");
          line.classList.toggle('transform-visibility');
          gametext.appendChild(line)
          console.log('assignment (for erase) is: ',assignment)
          if (assignment >= 0.7 && assignment < 0.9) {
            if (revolutionarysupport == 1) {
              start_revolutionaries_3()
            }
            if (revolutionarysupport == 2) {
              start_revolutionaries_4()
            }
            if (revolutionarysupport == 3) {
              start_revolutionaries_5()
            }
          }
        }
      }
      if (effect == "teach") {
        var gametext = document.querySelector("#gametext");
        var line = document.createElement('p');
        line.textContent = doors[i].quantity;
        line.classList.add("narration");
        line.classList.toggle('transform-visibility');
        gametext.appendChild(line)
      }
      if (effect == "success") {
        var gametext = document.querySelector("#gametext");
        var line = document.createElement('p');
        line.textContent = "congratulations, you have succeeded and found a utopia behind this door. there, no one is evicted and all believe in supporting others. reed is defeated. where people can belong, have a place to call home, have a place that makes them feel valued, have safety and security, have ways to learn and be curious, and have support when they need it. this is the abundance that will conquer greed. this is the fulfillment that leaves nothing for want.";
        line.classList.add("narration");
        line.classList.toggle('transform-visibility');
        gametext.appendChild(line)
        if (typeof document.querySelector('#audio') !== 'undefined') {
          document.querySelector('#audio').pause()
        }
      }
    }
  }
}

function insertnextriddle() {
  var gametext = document.querySelector('#gametext');
  clear_allgametext();
  var riddle = document.createElement('p');
  console.log('riddlecounter is: ',riddlecounter)
  riddle.textContent = riddles[riddlecounter].riddle;
  riddle.classList.add("narration");
  riddle.classList.toggle('transform-visibility');
  gametext.appendChild(riddle)
}


function submitriddle() {
  var riddleinput = document.querySelector('#riddleselection').value;
  // console.log('riddlecounter is: ',riddlecounter)

  if (riddleinput.indexOf(riddles[riddlecounter].answer) >= 0) {
    var gametext = document.querySelector('#gametext');
    var reward = document.createElement('p');
    reward.textContent = riddles[riddlecounter].reward;
    reward.classList.add("narration");
    reward.classList.toggle('transform-visibility');
    gametext.appendChild(reward);
    riddlecounter = riddlecounter + 1
    createNextbutton(gametext, insertnextriddle);
  }
}

function onclick_reset_value(elem_id) {
  var entry = document.getElementById(elem_id);
  entry.value = "";
}


function build_doorguessing() {
  var gamebox = document.querySelector('#gamebox');
  var doorinput = document.createElement('input');
  var linebreak = document.createElement('br');
  doorinput.setAttribute('type', 'number');
  doorinput.setAttribute('list', 'doornumbers');
  doorinput.setAttribute('id', 'doorselection');
  doorinput.setAttribute('onclick', 'onclick_reset_value(this.id)')
  doorinput.classList.add('search-label')
  var doorbutton = document.createElement('button');
  doorbutton.setAttribute('id', 'doorsubmit');
  doorbutton.addEventListener('click', submitdoor);
  doorbutton.innerHTML = 'knock on door';
  doorbutton.classList.add('button-30')
  gamebox.appendChild(linebreak);
  gamebox.appendChild(doorinput);
  gamebox.appendChild(doorbutton);
}

function build_riddleguessing() {
  var gamebox = document.querySelector('#gamebox');
  var riddleinput = document.createElement('input');
  var linebreak = document.createElement('br');
  riddleinput.setAttribute('type', 'text');
  riddleinput.setAttribute('id', 'riddleselection');
  riddleinput.classList.add('search-label')
  var riddlebutton = document.createElement('button');
  riddlebutton.setAttribute('id', 'riddlesubmit');
  riddlebutton.addEventListener('click', submitriddle);
  riddlebutton.innerHTML = 'answer riddle';
  riddlebutton.classList.add('button-30')
  gamebox.appendChild(linebreak);
  gamebox.appendChild(riddleinput);
  gamebox.appendChild(riddlebutton);
}

function seekbarchange() {
    var music = document.querySelector('#audio');
    const currentTime = document.querySelector('.current-time');
    const seekBar = document.querySelector('.seek-bar');
    music.currentTime = seekBar.value;
}

function massesTermination(musicplayer, seekBar) {
  console.log('terminated');
  // seekBar.removeEventListener('change', seekbarchange, false);
  $(".seek-bar").off('change')
  musicplayer.remove();
}


function createNextbutton(gametext, next_fn) {
  var nextbutton = document.createElement('button');
  nextbutton.innerHTML = 'continue...';
  nextbutton.classList.add('button-30');
  gametext.appendChild(nextbutton);
  nextbutton.addEventListener('click', next_fn)
}


// start masses function
function start_masses() {
  clear_startgame_box();

  var musicplayer = document.createElement('div');
  musicplayer.classList.add("music-player");

  const music = document.createElement('audio');
  music.setAttribute('id', 'audio');

  musicplayer.appendChild(music)

  var songslider = document.createElement('div');
  songslider.classList.add("song-slider");
  const seekBar = document.createElement('input');
  seekBar.classList.add('seek-bar');
  seekBar.setAttribute('type', 'range');
  seekBar.setAttribute('value', 0);
  const currentTime = document.createElement('span');
  currentTime.classList.add("current-time");
  currentTime.innerHTML = "00:00";
  var musicDuration = document.createElement('span');
  musicDuration.classList.add('song-duration');
  musicDuration.innerHTML = "00:00";
  musicDuration.hidden = true;

  songslider.appendChild(seekBar)
  songslider.appendChild(currentTime)
  songslider.appendChild(musicDuration)
  musicplayer.appendChild(songslider)

  var gamebox = document.querySelector('#gamebox')
  gamebox.appendChild(musicplayer)


  const setMusic = (i) => {
      seekBar.value = 0 + challenge; // set range slide value to 0;
      music.src = "nochoice.mp3";

      currentTime.innerHTML = '00:00';
      setTimeout(() => {
          seekBar.max = music.duration + challenge;
          musicDuration.innerHTML = formatTime(music.duration);
      }, 300);

      music.volume = 0;

      music.play();
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

  // seek bar
  setInterval(() => {
      seekBar.value = music.currentTime + challenge;
      currentTime.innerHTML = formatTime(music.currentTime + challenge);
  }, 500)

  setInterval(() => {
      seekBar.value = music.currentTime + challenge;
      currentTime.innerHTML = formatTime(music.currentTime + challenge);
      if (Math.floor(music.currentTime + challenge) != 0) {
        if(Math.floor(music.currentTime + challenge) == Math.floor(seekBar.max - challenge)){
            //massesTermination(musicplayer, seekBar);
            window.location.replace('file:///Users/brennanmcmullen/Documents/whatdoor_game/whatdoor_term.html')
            //window.location.replace('whatdoor_term.html')
        }
      }
  }, 500)


  function resettimer() {
    setMusic(0);
  }

  seekBar.addEventListener('change', seekbarchange, false);

  setMusic(0);

  var resetbutton = document.createElement('button');
  resetbutton.innerHTML = 'never stop working';
  resetbutton.classList.add('button-30')
  resetbutton.addEventListener('click', resettimer)
  gamebox.append(resetbutton);

  build_doorguessing()

  function read_masses(entryID) {
    var gametext = document.querySelector('#gametext');
    for (var i=0; i<masses.length; i++) {
      if (masses[i].entry == entryID) {
        var massestext = masses[i].text;
        for (var j=0; j<massestext.length; j++) {
          var line = document.createElement('p');
          line.textContent = massestext[j];
          line.classList.add("narration");
          line.classList.toggle('transform-visibility');
          gametext.appendChild(line)
        }
      }
    }
  }

  function start_masses_2() {
    clear_allgametext();
    read_masses(2);
  }

  function start_masses_1() {
    //console.log('clear all text so far, read next entry, and create masses next button')
    clear_allgametext();
    read_masses(1);
    createNextbutton(gametext, start_masses_2)
  }

  read_masses(0);
  createNextbutton(gametext, start_masses_1)

}

// start sabateurs
function start_sabateurs() {
  clear_startgame_box();
  build_doorguessing();

  function read_sabateurs(entryID) {
    var gametext = document.querySelector('#gametext');
    for (var i=0; i<sabateurs.length; i++) {
      if (sabateurs[i].entry == entryID) {
        var sabateurstext = sabateurs[i].text;
        for (var j=0; j<sabateurstext.length; j++) {
          var line = document.createElement('p');
          line.textContent = sabateurstext[j];
          line.classList.add("narration");
          line.classList.toggle('transform-visibility');
          gametext.appendChild(line)
        }
      }
    }
  }

  function start_sabateurs_2() {
    clear_allgametext();
    read_sabateurs(2);
  }

  function start_sabateurs_1() {
    //console.log('clear all text so far, read next entry, and create masses next button')
    clear_allgametext();
    read_sabateurs(1);
    createNextbutton(gametext, start_sabateurs_2)
  }

  read_sabateurs(0);
  createNextbutton(gametext, start_sabateurs_1)

}

// start sabateurs
function start_revolutionaries() {
  clear_startgame_box();
  build_doorguessing();

  function read_revolutionaries(entryID) {
    var gametext = document.querySelector('#gametext');
    for (var i=0; i<revolutionaries.length; i++) {
      if (revolutionaries[i].entry == entryID) {
        var revolutionariestext = revolutionaries[i].text;
        for (var j=0; j<revolutionariestext.length; j++) {
          var line = document.createElement('p');
          line.textContent = revolutionariestext[j];
          line.classList.add("narration");
          line.classList.toggle('transform-visibility');
          gametext.appendChild(line)
        }
      }
    }
  }
  function start_revolutionaries_5() {
    if (revolutionarysupport == 3) {
      clear_allgametext();
      read_revolutionaries(5);
    } else {
      var gametext = document.querySelector('#gametext');
      var line = document.createElement('p');
      line.textContent = "open a door before continuing"
      line.classList.add('narration');
      line.classList.toggle('transform-visibility');
      gametext.appendChild(line);
    }
  }

  function start_revolutionaries_4() {
    if (revolutionarysupport == 2) {
      clear_allgametext();
      read_revolutionaries(4);
      var gametext = document.querySelector('#gametext');
      createNextbutton(gametext, start_revolutionaries_5)
    } else {
      var gametext = document.querySelector('#gametext');
      var line = document.createElement('p');
      line.textContent = "open a door before continuing"
      line.classList.add('narration');
      line.classList.toggle('transform-visibility');
      gametext.appendChild(line);
    }
  }

  function start_revolutionaries_3() {
    if (revolutionarysupport == 1) {
      clear_allgametext();
      read_revolutionaries(3);
      var gametext = document.querySelector('#gametext');
      createNextbutton(gametext, start_revolutionaries_4)
    } else {
      var gametext = document.querySelector('#gametext');
      var line = document.createElement('p');
      line.textContent = "open a door before continuing"
      line.classList.add('narration');
      line.classList.toggle('transform-visibility');
      gametext.appendChild(line);
    }
  }

  function start_revolutionaries_2() {
    clear_allgametext();
    read_revolutionaries(2);
    createNextbutton(gametext, start_revolutionaries_3)
  }

  function start_revolutionaries_1() {
    //console.log('clear all text so far, read next entry, and create masses next button')
    clear_allgametext();
    read_revolutionaries(1);
    createNextbutton(gametext, start_revolutionaries_2)
  }

  read_revolutionaries(0);
  createNextbutton(gametext, start_revolutionaries_1)
}



function start_protagonists() {
  clear_startgame_box();
  var gametext = document.querySelector('#gametext');

  function read_protagonists(entryID) {
    var gametext = document.querySelector('#gametext');
    for (var i=0; i<protagonists.length; i++) {
      if (protagonists[i].entry == entryID) {
        var protagoniststext = protagonists[i].text;
        for (var j=0; j<protagoniststext.length; j++) {
          var line = document.createElement('p');
          line.textContent = protagoniststext[j];
          line.classList.add("narration");
          line.classList.toggle('transform-visibility');
          gametext.appendChild(line)
        }
      }
    }
  }

  function start_protagonists_3() {
    build_riddleguessing();
    insertnextriddle();
  }

  function start_protagonists_2() {
    clear_allgametext();
    read_protagonists(2);
    createNextbutton(gametext, start_protagonists_3)
  }

  function start_protagonists_1() {
    //console.log('clear all text so far, read next entry, and create masses next button')
    clear_allgametext();
    read_protagonists(1);
    createNextbutton(gametext, start_protagonists_2)
  }

  read_protagonists(0);
  createNextbutton(gametext, start_protagonists_1)

}


// start document
$(document).ready(function() {

  // define variables
  const startbutton = document.querySelector('#startgame');
  startbutton.addEventListener('click',start_game)


});
