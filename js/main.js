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

// STILL WORKING OUT KINKS ON THIS ONE, MEANT TO REFLECT FUNCTION ABOVE (KINDA SORTA)
function filterShop() {
  // declare variables
  var input = document.getElementById('searchinput');
  input = input.value.toUpperCase();
  var i;
  var j;
  // declare and separate poems
  var allitems = document.getElementsByClassName('itemgallery');
  var items = document.getElementsByClassName('item');
  var itemtitles = document.getElementsByTagName('h3');
  var metatags = document.getElementsByClassName('keywords');

  for (i = 0; i < itemtitles.length; i++) {
    itemtitle = itemtitles[i];
    itemcontent = itemtitle.textContent;

    if (itemcontent.toUpperCase().indexOf(input) > -1) {
      itemtitles[i].style.display = "";
      item = itemtitles[i].getElementsByTagName('img');
      for (a = 0; a < item.length; a++) {
        item[a].style.display = "";
      }

    } else {

      for (j = 0; j < metatags.length; j++) {
        metatagline = metatags[j];
        metaValue = metatagline.textContent;

        if(metaValue.toUpperCase().indexOf(input) > -1) {
          itemtitles[i].style.display = "";
          item = itemtitles[i].getElementsByTagName('img');
          for (a = 0; a < item.length; a++) {
            item[a].style.display = "";
          }

        } else {
          itemtitles[i].style.display = "none";
          item = itemtitles[i].getElementsByTagName('img');
          for (a = 0; a < item.length; a++) {
            item[a].style.display = "none";
          }
        }
      }
    }
  }
}

function addcart(elemt) {
  // check if element clicked is found
  console.log(elemt.parentElement.id);
  // item is add to cart parent element
  var item = elemt.parentElement;
  // get price and name from unique element tags in each item
  var price = item.getElementsByTagName('h4')[0].textContent;
  var name = item.getElementsByTagName('h3')[0].textContent;
  console.log(price);

  // create, add text, append item, and give it class
  var sidebar = document.getElementsByClassName('shopsidebar')[0];
  var cartitem = document.createElement('p');
  cartitem.innerText = name;
  sidebar.appendChild(cartitem);
  cartitem.classList.add("col-md-12");
  cartitem.classList.add("cartitem");

  // create, add text, append price, and give it class
  var listedprice = document.createElement('p');
  listedprice.innerText = price;
  cartitem.appendChild(listedprice);
  listedprice.classList.add("col-md-12");
  listedprice.classList.add("listedprice");

  // create, add text, append removal, and give it class
  var removal = document.createElement('button');
  removal.innerText = "remove";
  cartitem.appendChild(removal);
  removal.classList.add("removebutton")
  // Need to test below
  removal.onclick = function() {removecart(this)}

  // update price to integer before making total cell
  price = price.substring(2, 6);
  console.log("updated price integer is " + price);
  price = parseInt(price);

  // put total in the checkout button
  var checkouttotal = document.getElementById('checkoutbutton');
  var oldtotal = checkouttotal.textContent;
  oldtotal = oldtotal.substring(11);
  oldtotal = parseInt(oldtotal);
  console.log("oldtotal is " + oldtotal);
  var newtotal = oldtotal + price;
  console.log("newtotal is " + newtotal);
  var checkoutstring = "check out = " + newtotal;
  checkouttotal.innerText = checkoutstring;

}


function removecart(elemt) {
  // remove item from cart, start with variables
  var cartitem = elemt.parentElement;

  // update price
  var price = cartitem.getElementsByClassName('listedprice')[0];
  price = price.textContent;
  price = price.substring(2, 6);
  price = parseInt(price);
  var checkouttotal = document.getElementById('checkoutbutton');
  var oldtotal = checkouttotal.textContent;
  oldtotal = oldtotal.substring(11);
  oldtotal = parseInt(oldtotal);
  var newtotal = oldtotal - price
  console.log(newtotal);
  var checkoutstring = "check out = " + newtotal;
  checkouttotal.innerText = checkoutstring

  // remove cartitem
  cartitem.remove();
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



// simple w3 magnify
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    /*
    e.preventDefault();
    */
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}



function magnifylong(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass-long");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    /*
    e.preventDefault();
    */
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}


function magnifylonger(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass-longer");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    /*
    e.preventDefault();
    */
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}


function selectanswer(answer) {
  // declar variables
  var qcontainer = answer.parentElement;
  var answers = qcontainer.getElementsByClassName("answer");
  // loop through and unhighlight
  for (var i=0; i<5; i++) {
    answers[i].classList.remove("highlightAnswer");
  }

  answer.classList.add("highlightAnswer");
}

function mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [], count = [], i, number, maxIndex = 0;

    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }

    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }

    return modes;
}

function submitquiz() {
  // declare question containers
  var qcontainers = document.getElementsByClassName("qcontainer");

  // create array scoreboard and chapbooklist
  var arrayscore = []
  var chaparray = ["house plants", "universities", "ekwus cosmology", "ergot nothing", "not your cup of tea"]


  for (var i=0; i<qcontainers.length; i++) {
    var answers = qcontainers[i].getElementsByClassName("answer");
    for (var k=0; k<answers.length; k++) {
      if (answers[k].classList.contains("highlightAnswer") == true) {
        arrayscore = arrayscore + [k];
      }
    }
  }

  var chapindex = mode(arrayscore);
  console.log(chapindex);
  if (chapindex.length <= 1) {
    var chapchoice = chaparray[chapindex];
  } else {
    var chapchoice = chaparray[chapindex[0]];
  }
  console.log(chapchoice);

  var results = document.getElementsByClassName("result");
  console.log(results);
  for (var i=0; i<results.length; i++) {
    results[i].remove();
  }

  var submitbutton = document.getElementById("submitbutton")
  var insertresult = document.createElement('h1');
  insertresult.classList.add("result")
  insertresult.innerText = chapchoice;
  submitbutton.appendChild(insertresult);
}

function openMobileNav() {
  // declare variables by creating elements for menu nav
  var headermenu = document.getElementsByClassName('header-container')[0];
  var row = document.createElement('div');
  var column = document.createElement('div');
  //var shoplink = document.createElement('a');
  var activlink = document.createElement('a');
  var poemslink = document.createElement('a');
  var musiclink = document.createElement('a');

  // check to see if mobile-menu-items exists
  var mobilemenu = document.getElementsByClassName('mobile-menu-items')[0];
  if (typeof(mobilemenu) != 'undefined' && mobilemenu != null) {
    mobilemenu.remove();
  } else {
    headermenu.appendChild(row);
    row.appendChild(column);
    row.classList.add('row')
    column.classList.add('col-sm-12');
    column.classList.add('mobile-menu-items');

    //shoplink.innerText = 'Shop';
    //shoplink.setAttribute('href', 'mobileshop.html');
    //shoplink.classList.add('mobile-menu-item');
    //column.appendChild(shoplink);
    //var breaktag = document.createElement('br');
    //column.appendChild(breaktag);

    activlink.innerText = 'Activism';
    activlink.setAttribute('href', 'activism.html');
    activlink.classList.add('mobile-menu-item');
    column.appendChild(activlink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    poemslink.innerText = 'Poems';
    poemslink.setAttribute('href', 'mobilepoems.html');
    poemslink.classList.add('mobile-menu-item');
    column.appendChild(poemslink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    musiclink.innerText = 'Music';
    musiclink.setAttribute('href', 'mobilemusic.html');
    musiclink.classList.add('mobile-menu-item')
    column.appendChild(musiclink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);
  }

}
