function filterPoems4() {
  // declare variables
  var input = document.getElementById('searchinput');
  input = input.value.toUpperCase();
  var i;
  var j;
  // declare and separate poems
  var allpoemsUL = document.getElementById('poemset');
  var poemtitles = document.getElementsByTagName('li');
  var metatags = document.getElementsByClassName('keywords');

  for (i = 0; i < poemtitles.length; i++) {
    poemtitle = poemtitles[i];
    poemcontent = poemtitle.textContent;

    if (poemcontent.toUpperCase().indexOf(input) > -1) {
      poemtitles[i].style.display = "";
      poem = poemtitles[i].getElementsByTagName('p');
      for (a = 0; a < poem.length; a++) {
        poem[a].style.display = "";
      }

    } else {

      for (j = 0; j < metatags.length; j++) {
        metatagline = metatags[j];
        metaValue = metatagline.textContent;

        if(metaValue.toUpperCase().indexOf(input) > -1) {
          poemtitles[i].style.display = "";
          poem = poemtitles[i].getElementsByTagName('p');
          for (a = 0; a < poem.length; a++) {
            poem[a].style.display = "";
          }

        } else {
          poemtitles[i].style.display = "none";
          poem = poemtitles[i].getElementsByTagName('p');
          for (a = 0; a < poem.length; a++) {
            poem[a].style.display = "none";
          }
        }
      }
    }
  }
}


function hidethispoem(poemcontainer, id) {
  document.getElementById(id).style.display = "none";
}

function showthispoem(poemcontainer, id) {
  document.getElementById(id).style.display = "";
}


function filterPoems5() {
  // declare variables
  var input = document.getElementById('searchinput');
  var poemcontainer = document.getElementById('poemset');
  input = input.value.toUpperCase();
  for (count=0; count<allpoems.length; count++) {
    poemdict = allpoems[count];
    if (poemdict.title.toUpperCase().indexOf(input) == -1 && poemdict.keywords.toUpperCase().indexOf(input) == -1 && poemdict.poem.toUpperCase().indexOf(input) == -1) {
      var id = count.toString();
      hidethispoem(poemcontainer, id);
    } else {
      var id = count.toString();
      showthispoem(poemcontainer, id);
    }
  }
}



function uncollapse3(poemindex) {
  var allp = document.getElementsByTagName('p')
  var n;
  for (n = 0; n < allp.length; n++) {
    allp[n].style.display = "none"
  }

  var poemli = document.getElementById(poemindex);
  var poemp = poemli.getElementsByTagName('p');
  // 1below
  //var poembr = poemli.getElementsByTagName('br');
  var i;
  // 1below
  //var j;
  for (i=0; i< poemp.length; i++) {
    poemp[i].style.display = "block";
  }
  // 3below
  //for (j=0; j< poembr.length; i++) {
  //  poembr[j].style.display = "block";
  //}
}


function addpoems() {
  var poemcontainer = document.getElementById('poemset')
  console.log("this is the start of addpoems");
  console.log("there are ",allpoems.length," poems to add")
  for(count=0; count<allpoems.length; count++) {
    poemdict = allpoems[count];
    //create elements and append them to poemcontainer
    var poem_li_elem = document.createElement('li');
    var id = count.toString();
    poem_li_elem.setAttribute('id',id);
    poem_li_elem.setAttribute('onclick','uncollapse3(this.id)');
    poem_li_elem.textContent = poemdict.title;
    poem_ul_elem = document.createElement('ul');
    poem_a_elem = document.createElement('a');
    poem_a_elem.setAttribute('href','#');
    poem_a_elem.classList.add('keywords');
    poem_a_elem.textContent = poemdict.keywords;
    poem_ul_elem.appendChild(poem_a_elem);
    poem_ul_elem.innerHTML = poemdict.poem;
    poem_li_elem.appendChild(poem_ul_elem);
    //console.log("poem_li_elem is: ",poem_li_elem)
    poemcontainer.appendChild(poem_li_elem);
  };
}

function removepoems() {
  var poemcontainer = document.getElementById('poemset');
  var poem_li_elems = poemcontainer.getElementsByTagName('li');
  console.log("this is the start to removing poems");
  console.log("  there are ",poem_li_elems.length," poems to remove");
  console.log("the first is: ",poem_li_elems[0]);
  var count = 0
  counter = poem_li_elems.length
  while (count < counter) {
    poem_li_elems[0].remove();
    //console.log("next up: ",poem_li_elems[0])
    count += 1;
    //console.log("count is: ",count)
  };
}



$(document).ready(function() {

  const poemlistelems = document.getElementsByTagName('li');
  const allpoemselem = document.getElementById('poemset')
  const shuffle_btn = document.querySelector(".shuffle-btn")

  shuffle_btn.addEventListener('click', function(e) {
    removepoems()

    var m = allpoems.length, t, i;
    // shuffle poems
    while (m) {

      i = Math.floor(Math.random() * m--);

      t = allpoems[m]
      allpoems[m] = allpoems[i]
      allpoems[i] = t

    }
    addpoems()
  })

});
