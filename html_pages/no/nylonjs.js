let glossary = [
  {
    word:'anti-tidal',
    item:'anti-tidal',
    desc:'against the tide, grain, and probably gravity too if possible.',
  },
  {
    word:'bell pepper',
    item:'bell pepper',
    desc:'a fruit that is misleadingly silent',
  },
  {
    word:'bumper',
    item:'bumper slugs, whales, oblong creatures of concrete',
    desc:'the presumably asentient, inorganic stone figures that populate parking lots, roadsides, and other locations and assist as physical barriers for automobiles.',
  },
  {
    word:'claymore',
    item:'claymores',
    desc:'long swords that are long enough to be kinda visible from the ground when at 20,000 feet. or vice versa.',
  },
  {
    word:'crab',
    item:'crab',
    desc:'a clawed crustacean. a sense of potential or harmless threat.',
  },
  {
    word:'puppet',
    item:'dolls and puppets',
    desc:'the presumably asentient, inorganic stone figures that populate parking lots, roadsides, and other locations and assist as physical barriers for automobiles.',
  },
  {
    word:'doll',
    item:'dolls and puppets',
    desc:'the presumably asentient, inorganic stone figures that populate parking lots, roadsides, and other locations and assist as physical barriers for automobiles.',
  },
  {
    word:'sun',
    item:'different types of suns',
    desc:'Earthen sun and its many hats/faces/presentations.',
  },
  {
    word:'tumor',
    item:'fish tumors',
    desc:'malignant pockets of cells on fish.',
  },
  {
    word:'flemish',
    item:'flemish rabbit therapist',
    desc:'a therapist that was turned into a flemish rabbit.',
  },
  {
    word:'frenetically',
    item:'frenetically modified',
    desc:'the application of a status, a status that is an early sign that something has been taken, not gained.',
  },
  {
    word:'jagged',
    item:'jagged saw',
    desc:'jigsaw’s internal counterpart. a jigsaw made of assumptions.',
  },
  {
    word:'baba',
    item:'happy meal baba yaga hut',
    desc:'the famed baba yaga hut, a cabin with animated chicken legs, but the cabin is painted in the famed McDonald’s happy meal style.',
  },
  {
    word:'humming',
    item:'humming with hands in the ground',
    desc:"the magical practice of digging one's hands into the earth and humming a little tune.",
  },
  {
    word:'impresence',
    item:'impresence',
    desc:'the state of not being present, dissociated, potentially lost in a time-flank.',
  },
  {
    word:'frizzle',
    item:'ms. frizzle',
    desc:'a baddie. a teacher that believed in experience.',
  },
  {
    word:'nylon',
    item:'nylon',
    desc:'synthetic, thermoplastic polymer sometimes used to make organza.',
  },
  {
    word:'cords',
    item:'old phone cords',
    desc:'the twirly cables called coil cords for phones that were removed from their base and then returned, allowing the phone to be somewhat mobile from its station. easily fashions new beings thanks to their flexible nature.',
  },
  {
    word:'palinopsia',
    item:'palinopsia',
    desc:'seeing an after-image, a medical condition. or a tool for catching second winds.',
  },
  {
    word:'peach',
    item:'peach clot',
    desc:'when things we need and want are held up as a result of getting the things we need and want.',
  },
  {
    word:'scared balloon',
    item:'scared balloon',
    desc:'a balloon that is scared, frightened even.',
  },
  {
    word:'timeflank',
    item:'time flank',
    desc:'when the past and the future flank the present. it’s hard to move when this happens.',
  },
  {
    word:'tractor',
    item:'tractor beams',
    desc:'alien laser tech that selectively pulls objects closer. distant cousin to gravity and buoyancy.',
  },
  {
    word:'fruitcake',
    item:'upside down fruitcake',
    desc:'a baking novelty or robot head.',
  },
  {
    word:'rubber stamp',
    item:'rubber stamp',
    desc:'a bootprint, a brand for those that have been stepped on.',
  },
  {
    word:'big',
    item:'very very big things',
    desc:'things, as in matter that exists and has a place, but very very big. large. colossal sometimes. sizeable if that helps.',
  },
  {
    word:'coke',
    item:'crushed diet coke can, sometimes cursed',
    desc:'congrats, you found the secret anti-glossary item. this item accompanies other unspoken items, matters, and objectives',
  },
]


function checkglossary(line) {
  for (var wordnum = 0; wordnum < glossary.length; wordnum++) {
    if (line.search(glossary[wordnum].word) >= 0) {
      // return glossary word
      return glossary[wordnum].word;
    }
  }
  return 0;
}

function openglossary() {
  var glosslisttext = document.querySelector('#gloss-list').textContent;
  var foundwords = glosslisttext.split("-");
  //console.log('openglossary - foundwords are: ',foundwords);

  var poemTitle = document.querySelector('#title');
  var poemBody = document.querySelector('#poembody');
  try {
      var mangledpoem = document.querySelector('#mangled');
      mangledpoem.remove();
  } catch {

  }

  poemTitle.innerHTML = 'glossary';
  // clear previous poem if present
  var prevlines = poemBody.children;
  while (poemBody.firstChild) {
    poemBody.removeChild(poemBody.lastChild);
  }

  for (var glossnum = 0; glossnum < glossary.length; glossnum++) {
    for (var foundnum = 0; foundnum < foundwords.length; foundnum++) {
      var glossword = glossary[glossnum].word;
      var foundword = foundwords[foundnum];
      if (glossword == foundword) {

        let glossitem = glossary[glossnum];
        var glosstitleline = document.createElement('h3');
        glosstitleline.textContent = glossitem.item;
        glosstitleline.classList.add('poemline');
        var glossdescline = document.createElement('p');
        glossdescline.textContent = glossitem.desc;
        glossdescline.classList.add('poemline');
        poemBody.appendChild(glosstitleline);
        poemBody.appendChild(glossdescline)

      }
    }
  }
}

function startglossary() {
  var poemlist = document.querySelector('#poem-list');
  var poemlisting = document.createElement('li');
  poemlisting.textContent = 'glossary';
  poemlisting.classList.add('poemlisting');
  poemlisting.classList.add('poem-li-item');
  poemlisting.setAttribute('id', 'glossary');
  poemlisting.addEventListener('click',openglossary);
  // poemlist.appendChild(poemlisting);
  poemlist.insertBefore(poemlisting, poemlist.firstChild);
  // need to add parentelem.insertBefore(newelem, refelem)
}

function checkIFalreadyINglossary(glossaryword) {
  var glosslist = document.querySelector('#gloss-list');
  var glossstring = glosslist.textContent;
  // console.log('checkIFalreadyINglossary, current gloss list is: ',glossstring)
  // console.log('checkIFalreadyINglossary, searchin for ',glossaryword,' in current gloss list and the result is: ',glossstring.search(glossaryword))
  if (glossstring.search(glossaryword) >= 0) {
    return 1;
  } else {
    return 0;
  }
}

function addtoglossary(word) {
  var glosslist = document.querySelector('#gloss-list');
  // console.log('addtoglossary - glosslist elem is: ', glosslist)
  // console.log('addtoglossary - word is: ',word)
  var glossstring = glosslist.textContent;
  var newglossstr = glossstring + "-" + word;
  glosslist.innerHTML = newglossstr;
}

function countglossarywords() {
  var glosslist = document.querySelector('#gloss-list');
  var glossstring = glosslist.textContent;
  var glosswords = glossstring.split("-");
  if (glosswords.length == 23) {
    addtoglossary('coke');
  }
  return glosswords.length;
}

// function secreteglossaryitem() {
//   var glosslist = document.querySelector('#gloss-list');
//   var glossstring = glosslist.textContent;
//   var newglossstr = glossstring + " " + glossary[wordnum].word
//   glosslist.textContet = newglossstr
// }





function logpoemAScompleted(poemtitle) {
  var poemprogress = document.querySelector('#poem-progress');
  var poemprog_titles = poemprogress.textContent;
  var poemtitles_sofar = poemprog_titles.split('-');
  var dupe_tracker = 0
  for (var i=0; i<poemtitles_sofar.length; i++) {
    var currpoem = poemtitles_sofar[i];
    if (poemtitle == currpoem) {
      dupe_tracker = 1
    }
  }
  if (dupe_tracker == 0) {
    var newpoemprog = poemprog_titles + "-" + poemtitle;
    poemprogress.innerHTML = newpoemprog;
  }
}

function updateprogressbar() {
  var progressbar = document.querySelector('#progressbar');
  var poemprogress = document.querySelector('#poem-progress');
  var poemprog_titles = poemprogress.textContent;
  var poemtitles_sofar = poemprog_titles.split('-');

  var calc = Math.floor((poemtitles_sofar.length/(poems.length+3))*100);
  console.log('calc is: ',calc);
  progressbar.style.width = calc + "%"
}






// start document
$(document).ready(function() {

  let currPoem = 0;

  function setpoem(i) {
    //console.log('running setpoem');
    var poemTitle = document.querySelector('#title');
    var poemBody = document.querySelector('#poembody');
    try {
        var mangledpoem = document.querySelector('#mangled');
        mangledpoem.remove();
    } catch {

    }
    let poem = poems[i];
    //console.log('i is:', i);
    poemTitle.innerHTML = poem.title;
    // clear previous poem if present
    var prevlines = poemBody.children;
    while (poemBody.firstChild) {
      poemBody.removeChild(poemBody.lastChild);
    }

    var poemlines = poem.poem;
    //console.log('poemlines are: ',poemlines)
    for (var linenum = 0; linenum < poemlines.length; linenum++) {
      var poemline = document.createElement('p');
      poemline.textContent = poemlines[linenum];
      //console.log('line is: ',poemlines[linenum]);
      poemline.classList.add('poemline');
      poemBody.appendChild(poemline);

      // check to see if line includes a glossary word
      var glossword = checkglossary(poemlines[linenum]);
      // if it does include a glossary word...
      if (glossword != 0) {
        // assess if the glossary word is already in the glossary list
        var assessment = checkIFalreadyINglossary(glossword);
        // console.log('assessment is (if 0, not already in the glossary): ',assessment)
        // if it's not in the glossary list...
        if (assessment == 0) {
          // add it to the glossary list
          addtoglossary(glossword);
          // if the count of glossary words is now just 1
          //console.log('count of glossary words is: ',countglossarywords());
          if (countglossarywords() == 2) {
            // start the glossary
            startglossary();
          }
        }
      }
    }
    currPoem = i;
    logpoemAScompleted(poem.title);
    updateprogressbar();
  }



  function shufflepoems() {
    var m = poems.length, t, i;
    while (m) {

      i = Math.floor(Math.random() * m--);

      t = poems[m]
      poems[m] = poems[i]
      poems[i] = t

    }
    setpoem(1);
  }


  function checkactive(activepoems, currPoem, inlist) {
      for (activecount=0; activecount<activepoems.length; activecount++) {
        if (activepoems[activecount].style.display != 'none') {
          if (poems[currPoem].title == activepoems[activecount].textContent) {
            inlist = true
          }
        }
      }
      return inlist
  }

  function nextpoem() {
    var inlist = null;
    var poemlist = document.querySelector('#poem-list');
    var activepoems = poemlist.children

    while (inlist == null) {
      inlist = checkactive(activepoems, currPoem+1, inlist)
      if(currPoem >= poems.length - 1){
          currPoem = 0;
      } else{
          currPoem++;
      }
    }
    setpoem(currPoem);
  }

  function findmatchandset(poemlisting) {
    var poemlistingtarget = poemlisting.target
    for (var i = 0; i < poems.length; i++) {
      if (poems[i].title == poemlistingtarget.innerHTML) {
        setpoem(i);
      }
    }
  }

  function carefulnow() {
    const poemBody = document.querySelector('#poembody');
    const poemBlock = document.querySelector('.poemblock');
    var mangledindicator = document.createElement('h3');
    mangledindicator.innerHTML = '~ m_//a/n//g/l//e/_d ~'
    var mangledpoem = document.createElement('div');
    mangledpoem.setAttribute('id', 'mangled');
    poemBlock.appendChild(mangledpoem);
    var lines = poemBody.children;
    while (poemBody.firstChild) {
      var words = poemBody.lastChild.innerHTML;
      //console.log(poemBody.lastChild);
      //console.log(words);
      if (words != '') {
        //console.log(typeof(words));
        var words = words.split(" ");
        //console.log(words);
        var newwords = '';
        for (var wordnum = 0; wordnum < words.length; wordnum++) {
            word = words[wordnum];
            if (word != 'the' && word != 'a' && word != 'my') {
              if (Math.random() <= 0.65) {
                newwords = newwords + words[wordnum] + " ";
              }
            }
          }
        var newelem = document.createElement('p');
        newelem.textContent = newwords;
        mangledpoem.appendChild(newelem);
      }
      //console.log('ready to remove last child')
      poemBody.removeChild(poemBody.lastChild);
      mangledpoem.insertBefore(mangledindicator, mangledpoem.firstChild);

    }
    //
    // for (var elemnum = 0; elemnum < lines.length; elemnum++) {
    //   var words = lines[elemnum].innerHTML
    //   console.log(words);
    //   words.split(' ');
    //   //console.log(words);
    //   var newwords = ''
    //   for (var wordnum = 0; wordnum < words.length; wordnum++) {
    //     if (Math.random() <= 0.7) {
    //       newwords = newwords + words[wordnum];
    //     }
    //   }
    //   lines[elemnum].remove();
    //   var newelem = document.createElement('p');
    //   newelem.textContet = newwords;
    //   poemBody.appendChild(newelem);
    // }
  }



  // start code:
  const poemTitle = document.querySelector('#title');
  const poemBody = document.querySelector('#poembody');

  const shufflebtn = document.querySelector('#shuffle');
  const nextbtn = document.querySelector('#next');
  shufflebtn.addEventListener('click', shufflepoems);
  nextbtn.addEventListener('click', nextpoem);


  // add songs
  const poemlist = document.querySelector('#poem-list');
  //console.log('poemlist: ',poemlist);
  //console.log('poems length is: ',poems.length);
  for (i=0; i<poems.length; i++) {
    var poemlisting = document.createElement('li');
    poemlisting.textContent = poems[i].title;
    poemlisting.classList.add('poemlisting');
    poemlisting.classList.add('poem-li-item');
    poemlisting.addEventListener('click',findmatchandset);
    poemlist.appendChild(poemlisting);
  }


  // release chaos
  const chaosbtn = document.querySelector('#free');
  chaosbtn.addEventListener('click', carefulnow)


});
