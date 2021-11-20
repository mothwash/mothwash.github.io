


// styling on open
$(document).ready(function() {
  if (window.innerWidth <= 769) {
    $('.chapHOME').css({'padding-top':'215px'})
    $('.chapHOME').css({'padding-bottom':'30px'})
    $('.chapbookicon').css({'display':'block','margin-left':'auto','margin-right':'auto'})
    $('.chaprow-text').css({'text-align':'center','padding-top':'25px'})
  } else {
    $('.chapHOME').css({'padding-top':'180px'})
    $('.chapHOME').css({'padding-bottom':'45px'})
    $('.chapbookicon').css({'display':'','margin-left':'','margin-right':''})
    $('.chaprow-text').css({'text-align':'right','padding-top':'0px'})
  }
  if (window.innerWidth <= 504) {
    $('.quiznotice').css({'height':'140px'})
  } else {
    $('.quiznotice').css({'height':'100px'})
  }
});




// styling changes with window resizes
$(document).ready(function() {
  $(window).resize(function() {
    if (window.innerWidth <= 769) {
      $('.chapHOME').css({'padding-top':'215px'})
      $('.chapHOME').css({'padding-bottom':'30px'})
      $('.chapbookicon').css({'display':'block','margin-left':'auto','margin-right':'auto'})
      $('.chaprow-text').css({'text-align':'center','padding-top':'25px'})
    } else {
      $('.chapHOME').css({'padding-top':'180px'})
      $('.chapHOME').css({'padding-bottom':'45px'})
      $('.chapbookicon').css({'display':'','margin-left':'','margin-right':''})
      $('.chaprow-text').css({'text-align':'right','padding-top':'0px'})
    }
    if (window.innerWidth <= 504) {
      $('.quiznotice').css({'height':'140px'})
    } else {
      $('.quiznotice').css({'height':'100px'})
    }

    if (window.innerWidth >= 1440) {

    } else {

    }
  });
});




// ChapQuiz functions
function selectanswer(answer) {
  // declar variables
  var qcontainer = answer.parentElement;
  var answers = qcontainer.getElementsByClassName("answer");
  // loop through and unhighlight
  for (var i=0; i<8; i++) {
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
  var chaparray = ["post truth structuralism desires", "when i left alive", "house plants", "universities", "ekwus cosmology", "ergot nothing", "wooden leg", "not your cup of tea"]


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




// making the chapbooks work
// change indicator color

$(document).ready(function() {
  $('#chapCarousel').on('slid.bs.carousel', function (event) {
    //var currentslide = $(event.relatedTarget).index() - 1;
    var nextactiveslide = $(event.relatedTarget).index();
    var $indicators = $('.carousel-indicators');
    //var $current = $indicators.find("[data-slide-to='" + currentslide + "']")
    //$current[0].style.backgroundColor = "#213673";
    var $active = $indicators.find("[data-slide-to='" + nextactiveslide + "']");
    $active[0].style.backgroundColor = "#752515";
  });
});


// scroll slowly to top if below top
$(document).ready(function() {
  $('#chapCarousel').on('slid.bs.carousel', function (event) {
    var ycoor = window.pageYOffset
    var xcoor = window.pageXOffset
    //console.log("ycoor is: ",ycoor)
    if (ycoor != 0) {
      // insert pause icon
      // scroll slowly
      $('html, body').animate({
        scrollTop: "0"
      },1000);
    }
  });
});


// touch slide for mobile
$('.carousel').on('touchstart', function(event){
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).on('touchmove', function(event){
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;

        if( Math.floor(xClick - xMove) > sensitivityInPx ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -sensitivityInPx ){
            $(this).carousel('prev');
        }
    });
    $(this).on('touchend', function(){
        $(this).off('touchmove');
    });
});
