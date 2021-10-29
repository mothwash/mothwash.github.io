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
