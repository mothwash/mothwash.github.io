$(document).ready(function() {
  addEventListenerByClass("choices", "click", addline);
  var backbone = document.querySelector("#backbone-holder");
  backbone.style.setProperty('--opacity', 0);

});

console.log("test V03: 2024-02-10 ");

// Support functions
// add event listener by class type
function addEventListenerByClass(className, eventType, fn) {
  var list = document.getElementsByClassName(className);
  for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(eventType, fn, false);
  }
}

function addline(choice_button) {
  // get choice data
  //console.log("choice: ",choice_button.target.innerText);
  var choice_option = choice_button.target.innerText;
  var this_choice_data = findthischoice(choice_option);
  console.log("choice_data: ",this_choice_data);
  var choicenum = thischoicenumber(this_choice_data, choice_option)
  // create line elem and append
  var line = document.createElement('h4');
  var breakelem = document.createElement('br');
  line.innerText = getline(choicenum, this_choice_data);
  var lines_elem = document.querySelector("#lines");
  lines_elem.append(line);
  lines_elem.append(breakelem);
  // update background opacity
  var backbone = document.querySelector("#backbone-holder");
  backbone.style.setProperty('--opacity', this_choice_data.opacity);
  // add image at position
  // new choices (get next choice, set buttons)
  var nextchoice = findnextchoice(choicenum, this_choice_data);
  console.log("nextchoice is: ",nextchoice);
  var next_choice_data = getnextchoices(nextchoice);
  console.log("next_choice_data: ",next_choice_data);
  var buttons_elem = document.querySelector("#buttons");
  buttons_elem.children[0].innerText = next_choice_data.choice_option_01;
  buttons_elem.children[1].innerText = next_choice_data.choice_option_02;
  // buttons go away after 5 lines
}


function findthischoice(choice_option) {
  //console.log("choices_data is: ",choices_data)
  for (var choice = 0; choice < choices_data.length; choice++) {
    if (choices_data[choice].choice_option_01 == choice_option) {
      return choices_data[choice];
    }
    if (choices_data[choice].choice_option_02 == choice_option) {
      return choices_data[choice];
    }
  }
}


function thischoicenumber(this_choice_data, choice_option) {
  if (choice_option == this_choice_data.choice_option_01) {
    return 1;
  } else {
    return 2;
  }
}

function findnextchoice(choicenum, this_choice_data) {
  if (choicenum == 1) {
    return this_choice_data.next_choice_num_01;
  } else {
    return this_choice_data.next_choice_num_02;
  }
}


function getline(choicenum, this_choice_data) {
  if (choicenum == 1) {
    return this_choice_data.choice_option_01_line;
  } else {
    return this_choice_data.choice_option_02_line;
  }
}


function getnextchoices(nextchoice) {
  for (var choice = 0; choice < choices_data.length; choice++) {
    if (choices_data[choice].choice_num == nextchoice) {
      return choices_data[choice]
    }
  }
}
