// menu highlight current page
function highlightMenuOpt() {
  // declare variables
  var i;
  var onPage = window.location.href;
  var onPage = onPage.toString();
  //console.log(onPage);
  var menuitems = document.getElementsByClassName('homemenu-item');

  for  (i = 0; i< menuitems.length; i++) {
    menuitem = menuitems[i].getElementsByTagName('a');
    menuLink = menuitem[0].getAttribute("href");
    //console.log(menuLink);
    var linkBIN = onPage.includes(menuLink);
    //console.log(linkBIN);
    if (linkBIN == true) {
      menuitem[0].style.color = 'white';
    }

  }
}


// configure menu size on open

function onPageOpenResizeMenu() {
  // if window is tablet size or smaller
  if (window.innerWidth < 992) {
    // hide current home menu
    $(".homemenu-item").hide();
    // hide social icons
    $(".top-header-social").hide();
    // declare variables
    var homemenu = document.getElementsByClassName("homemenu")[0];
    // create icon element
    var row = document.createElement('div');
    var favicon = document.createElement('i');
    // find onPage html
    var onPage = window.location.href;
    var onPage = onPage.toString();
    //console.log(onPage);
    // check to see if mobile menu icon exists
    var mobilemenuicon = document.getElementsByClassName('mobilemenuicon')[0];
    if (typeof(mobilemenuicon) != 'undefined' && mobilemenuicon !=null) {
    } else {
      // append children
      homemenu.appendChild(row);
      row.appendChild(favicon)
      // add classes
      row.classList.add('row')
      favicon.classList.add('fas');
      favicon.classList.add('fa-list');
      favicon.classList.add('mobilemenuicon')
      if (onPage.includes('chapbook_pages') || onPage.includes('activism_pages') == true) {
        //console.log('chapbooks is true')
        favicon.setAttribute('onclick', 'openMobileNavLAYERUP2()')
      } else if (onPage.includes('html_pages') == true) {
        //console.log('html_pages is true')
        favicon.setAttribute('onclick', 'openMobileNavLAYERUP()')
      } else {
        favicon.setAttribute('onclick', 'openMobileNav()')
      }
    }
  } else {
    $(".homemenu-item").show();
    $(".top-header-social").show();
    $(".mobilemenuicon").remove();
  }
}

function dropdownMenu(dropdownID) {
  // create menu string

  var menuID = "menu-" + dropdownID
  // get dropdown ELEM and menu ELEM
  var dropdownELEM = document.getElementById(dropdownID);
  var menuELEM = document.getElementById(menuID);

  // find dropdown position
  var leftPos = dropdownELEM.getBoundingClientRect().left;

  // check to see if menu open
  if (menuELEM.style.display != "block") {
    menuELEM.style.display = "block";
    menuELEM.style.position = "relative"
    menuELEM.style.left = leftPos + "px";
  } else {
    menuELEM.style.display = "none";
  }
}

// listen for click to close open dropdown menu
document.addEventListener('click', function(e) {
  // make sure click is not on a link
  // click target
  var target = e.target;

  if (target.tagName != 'A') {

    var dropsContainer = document.getElementsByClassName('menu-dropdown-container')[0];
    var openDrop = dropsContainer.firstElementChild

    if (openDrop.style.display == "block") {
      openDrop.style.display = "none";
    }
  }
})


//menu resize
$(document).ready(function() {
  $(window).resize(function() {
    // if window is tablet size or smaller
    if (window.innerWidth < 992) {
      // hide current home menu
      $(".homemenu-item").hide();
      // hide social icons
      $(".top-header-social").hide();
      // declare variables
      var homemenu = document.getElementsByClassName("homemenu")[0];
      // create icon element
      var row = document.createElement('div');
      var favicon = document.createElement('i');
      // find onPage html
      var onPage = window.location.href;
      var onPage = onPage.toString();
      //console.log(onPage);
      // check to see if mobile menu icon exists
      var mobilemenuicon = document.getElementsByClassName('mobilemenuicon')[0];
      if (typeof(mobilemenuicon) != 'undefined' && mobilemenuicon !=null) {

        //console.log(onPage.includes('testimonial-pages'));
        if (onPage.includes('chapbook_pages') || onPage.includes('activism_pages') == true) {
          //console.log('chapbooks is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP2()')
        } else if (onPage.includes('html_pages') == true) {
          //console.log('html_pages is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP()')
        } else {
          favicon.setAttribute('onclick', 'openMobileNav()')
        }

      } else {
        // append children
        homemenu.appendChild(row);
        row.appendChild(favicon)
        // add classes
        row.classList.add('row')
        favicon.classList.add('fas');
        favicon.classList.add('fa-list');
        favicon.classList.add('mobilemenuicon')
        if (onPage.includes('chapbook_pages') || onPage.includes('activism_pages') == true) {
          //console.log('chapbooks is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP2()')
        } else if (onPage.includes('html_pages') == true) {
          //console.log('html_pages is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP()')
        } else {
          favicon.setAttribute('onclick', 'openMobileNav()')
        }

      }
    } else {
      $(".homemenu-item").show();
      $(".top-header-social").show();
      $(".mobilemenuicon").remove();
    }

    // eliminate mobile menu if visible
    var mobilemenu = document.getElementsByClassName('mobile-menu-items')[0];
    if (window.innerWidth > 992) {
      if (typeof(mobilemenu) != 'undefined' && mobilemenu !=null) {
        mobilemenu.remove();
      }
    }
  });
});

//menu on open
$(document).ready(function() {
    // if window is tablet size or smaller
    if (window.innerWidth < 992) {
      // hide current home menu
      $(".homemenu-item").hide();
      // hide social icons
      $(".top-header-social").hide();
      // declare variables
      var homemenu = document.getElementsByClassName("homemenu")[0];
      // create icon element
      var row = document.createElement('div');
      var favicon = document.createElement('i');
      // find onPage html
      var onPage = window.location.href;
      var onPage = onPage.toString();
      //console.log(onPage);
      // check to see if mobile menu icon exists
      var mobilemenuicon = document.getElementsByClassName('mobilemenuicon')[0];
      if (typeof(mobilemenuicon) != 'undefined' && mobilemenuicon !=null) {

        if (onPage.includes('chapbook_pages') || onPage.includes('activism_pages') == true) {
          //console.log('chapbooks is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP2()')
        } else if (onPage.includes('html_pages') == true) {
          //console.log('html_pages is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP()')
        } else {
          favicon.setAttribute('onclick', 'openMobileNav()')
        }

//        if (onPage.includes('html_pages') == true) {
//          console.log(onPage.includes('chapbooks'));
//          if (onPage.includes('chapbooks') == true) {
//            console.log("we're here");
//            favicon.setAttribute('onclick', "openMobileNavLAYERUP2()");
//          } else {
//            console.log("but are we here?");
//            favicon.setAttribute('onclick', "openMobileNavLAYERUP()");
//          }
//        } else {
//          favicon.setAttribute("onclick", "openMobileNav()");
//        }


      } else {
        // append children
        homemenu.appendChild(row);
        row.appendChild(favicon)
        // add classes
        row.classList.add('row')
        favicon.classList.add('fas');
        favicon.classList.add('fa-list');
        favicon.classList.add('mobilemenuicon')
        var onPageBIN = onPage.includes("html_pages");
        console.log(onPageBIN);
        if (onPage.includes('chapbook_pages') || onPage.includes('activism_pages') == true) {
          //console.log('chapbooks is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP2()')
        } else if (onPage.includes('html_pages') == true) {
          //console.log('html_pages is true')
          favicon.setAttribute('onclick', 'openMobileNavLAYERUP()')
        } else {
          favicon.setAttribute('onclick', 'openMobileNav()')
        }

      }
    } else {
      $(".homemenu-item").show();
      $(".top-header-social").show();
      $(".mobilemenuicon").remove();
    }

    // eliminate mobile menu if visible
    var mobilemenu = document.getElementsByClassName('mobile-menu-items')[0];
    if (window.innerWidth > 992) {
      if (typeof(mobilemenu) != 'undefined' && mobilemenu !=null) {
        mobilemenu.remove();
      }
    }
});




function openMobileNav() {
  // declare variables and create elements
  var headermenu = document.getElementsByClassName('top-header-container')[0];
  var row = document.createElement('div');
  var column = document.createElement('div');

  var homeLink = document.createElement('a');
  var activismLink = document.createElement('a');
  var artLink = document.createElement('a');
  var poemsLink_drop = document.createElement('a');
  var chapbooksLink_drop = document.createElement('a');
  var musicLink_drop = document.createElement('a');

  // check to see if mobile-menu-items exists
  var mobilemenu = document.getElementsByClassName('mobile-menu-row')[0];
  if (typeof(mobilemenu) != 'undefined' && mobilemenu != null) {

    //count = (7 + 1) * 16
    //heightcount = '-=' + count.toString() + 'px'

    //jQuery(".mobile-menu-items").animate({
    //  height: heightcount
    //});

    $('.mobile-menu-row').hide('slow', function(){ $('.mobile-menu-row').remove(); });
    //mobilemenu.remove();

  } else {
    // add in box elements and their classes
    headermenu.appendChild(row);
    row.appendChild(column);

    setTimeout(function(){ row.classList.add('mobile-menu-row'); }, 20);

    row.classList.add('row');
    row.classList.add('mobile-menu-row');
    column.classList.add('col-sm-12');
    column.classList.add('col-xs-12');
    column.classList.add('mobile-menu-items');

    // animate height by 16px for each link
    count = (9 + 3) * 18
    heightcount = '+=' + count.toString() + 'px'

    $(".mobile-menu-items").animate({
      height: heightcount
    });

    homeLink.innerText = 'home';
    homeLink.setAttribute('href', 'index.html');
    homeLink.classList.add('mobilemenuitem');
    column.appendChild(homeLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    activismLink.innerText = 'activism';
    activismLink.setAttribute('href', 'html_pages/activism.html');
    activismLink.classList.add('mobilemenuitem');
    column.appendChild(activismLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    artLink.innerText = 'art';
    artLink.setAttribute('href', '#');
    artLink.classList.add('mobilemenuitem');
    column.appendChild(artLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    poemsLink_drop.innerText = 'poems';
    poemsLink_drop.setAttribute('href', 'html_pages/poems.html');
    poemsLink_drop.classList.add('mobilemenuitem');
    poemsLink_drop.classList.add('mobiledrop')
    column.appendChild(poemsLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    chapbooksLink_drop.innerText = 'chapbooks';
    chapbooksLink_drop.setAttribute('href', 'html_pages/chapbooks.html');
    chapbooksLink_drop.classList.add('mobilemenuitem');
    chapbooksLink_drop.classList.add('mobiledrop')
    column.appendChild(chapbooksLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    musicLink_drop.innerText = 'music';
    musicLink_drop.setAttribute('href', 'html_pages/music.html');
    musicLink_drop.classList.add('mobilemenuitem');
    musicLink_drop.classList.add('mobiledrop')
    column.appendChild(musicLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

  }
}


function openMobileNavLAYERUP() {
  // declare variables and create elements
  var headermenu = document.getElementsByClassName('top-header-container')[0];
  var row = document.createElement('div');
  var column = document.createElement('div');

  var homeLink = document.createElement('a');
  var activismLink = document.createElement('a');
  var artLink = document.createElement('a');
  var poemsLink_drop = document.createElement('a');
  var chapbooksLink_drop = document.createElement('a');
  var musicLink_drop = document.createElement('a');

  // check to see if obile-menu-items exists
  var mobilemenu = document.getElementsByClassName('mobile-menu-row')[0];
  if (typeof(mobilemenu) != 'undefined' && mobilemenu != null) {

    //count = (7 + 1) * 16
    //heightcount = '-=' + count.toString() + 'px'

    //jQuery(".mobile-menu-items").animate({
    //  height: heightcount
    //});

    $('.mobile-menu-row').hide('slow', function(){ $('.mobile-menu-row').remove(); });
    //mobilemenu.remove();

  } else {
    // add in box elements and their classes
    headermenu.appendChild(row);
    row.appendChild(column);

    setTimeout(function(){ row.classList.add('mobile-menu-row'); }, 20);

    row.classList.add('row');
    row.classList.add('mobile-menu-row');
    column.classList.add('col-sm-12');
    column.classList.add('col-xs-12');
    column.classList.add('mobile-menu-items');

    // animate height by 16px for each link
    count = (9 + 3) * 18
    heightcount = '+=' + count.toString() + 'px'

    $(".mobile-menu-items").animate({
      height: heightcount
    });

    homeLink.innerText = 'home';
    homeLink.setAttribute('href', '../index.html');
    homeLink.classList.add('mobilemenuitem');
    column.appendChild(homeLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    activismLink.innerText = 'activism';
    activismLink.setAttribute('href', 'activism.html');
    activismLink.classList.add('mobilemenuitem');
    column.appendChild(activismLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    artLink.innerText = 'art';
    artLink.setAttribute('href', '#');
    artLink.classList.add('mobilemenuitem');
    column.appendChild(artLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    poemsLink_drop.innerText = 'poems';
    poemsLink_drop.setAttribute('href', 'poems.html');
    poemsLink_drop.classList.add('mobilemenuitem');
    poemsLink_drop.classList.add('mobiledrop')
    column.appendChild(poemsLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    chapbooksLink_drop.innerText = 'chapbooks';
    chapbooksLink_drop.setAttribute('href', 'chapbooks.html');
    chapbooksLink_drop.classList.add('mobilemenuitem');
    chapbooksLink_drop.classList.add('mobiledrop')
    column.appendChild(chapbooksLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    musicLink_drop.innerText = 'music';
    musicLink_drop.setAttribute('href', 'music.html');
    musicLink_drop.classList.add('mobilemenuitem');
    musicLink_drop.classList.add('mobiledrop')
    column.appendChild(musicLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

  }
}



function openMobileNavLAYERUP2() {
  // declare variables and create elements
  var headermenu = document.getElementsByClassName('top-header-container')[0];
  var row = document.createElement('div');
  var column = document.createElement('div');

  var homeLink = document.createElement('a');
  var activismLink = document.createElement('a');
  var artLink = document.createElement('a');
  var poemsLink_drop = document.createElement('a');
  var chapbooksLink_drop = document.createElement('a');
  var musicLink_drop = document.createElement('a');

  // check to see if obile-menu-items exists
  var mobilemenu = document.getElementsByClassName('mobile-menu-row')[0];
  if (typeof(mobilemenu) != 'undefined' && mobilemenu != null) {

    //count = (7 + 1) * 16
    //heightcount = '-=' + count.toString() + 'px'

    //jQuery(".mobile-menu-items").animate({
    //  height: heightcount
    //});

    $('.mobile-menu-row').hide('slow', function(){ $('.mobile-menu-row').remove(); });
    //mobilemenu.remove();

  } else {
    // add in box elements and their classes
    headermenu.appendChild(row);
    row.appendChild(column);

    setTimeout(function(){ row.classList.add('mobile-menu-row'); }, 20);

    row.classList.add('row');
    row.classList.add('mobile-menu-row');
    column.classList.add('col-sm-12');
    column.classList.add('col-xs-12');
    column.classList.add('mobile-menu-items');

    // animate height by 16px for each link
    count = (9 + 3) * 18
    heightcount = '+=' + count.toString() + 'px'

    $(".mobile-menu-items").animate({
      height: heightcount
    });

    homeLink.innerText = 'home';
    homeLink.setAttribute('href', '../../index.html');
    homeLink.classList.add('mobilemenuitem');
    column.appendChild(homeLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    activismLink.innerText = 'activism';
    activismLink.setAttribute('href', '../activism.html');
    activismLink.classList.add('mobilemenuitem');
    column.appendChild(activismLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    artLink.innerText = 'art';
    artLink.setAttribute('href', '#');
    artLink.classList.add('mobilemenuitem');
    column.appendChild(artLink);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    poemsLink_drop.innerText = 'poems';
    poemsLink_drop.setAttribute('href', '../poems.html');
    poemsLink_drop.classList.add('mobilemenuitem');
    poemsLink_drop.classList.add('mobiledrop')
    column.appendChild(poemsLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    chapbooksLink_drop.innerText = 'chapbooks';
    chapbooksLink_drop.setAttribute('href', '../chapbooks.html');
    chapbooksLink_drop.classList.add('mobilemenuitem');
    chapbooksLink_drop.classList.add('mobiledrop')
    column.appendChild(chapbooksLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

    musicLink_drop.innerText = 'music';
    musicLink_drop.setAttribute('href', '../music.html');
    musicLink_drop.classList.add('mobilemenuitem');
    musicLink_drop.classList.add('mobiledrop')
    column.appendChild(musicLink_drop);
    var breaktag = document.createElement('br');
    column.appendChild(breaktag);

  }
}






// styling changes with window resizes
$(document).ready(function() {
  $(window).resize(function() {
    if (window.innerWidth <= 768) {
      var topHeader = document.getElementsByClassName('top-header');
      topHeader[0].style.height = '70px';
    } else {
      var topHeader = document.getElementsByClassName('top-header');
      topHeader[0].style.height = '35px';
    }

    if (window.innerWidth >= 1440) {

    } else {

    }
  });
});
