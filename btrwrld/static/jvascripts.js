// on load
$(document).ready(function() {

  var begin_button = document.querySelector('#beginbutton');
  begin_button.addEventListener('click', startquestions, false);

  // testing
  shuffle_questions();
  // add_question('Condition', 0);
  // add_question('Condition', 1);
  // add_question('Condition', 2);
  // add_question('Resource', 5);
  // add_question('Resource', 6);
  // add_question('Resource', 0);

});

// support functions
function shuffle_questions() {
  var m = questions.length, t, i;
    // shuffle songs
    while (m) {

      i = Math.floor(Math.random() * m--);

      t = questions[m]
      questions[m] = questions[i]
      questions[i] = t

    }
}

function hide_elem(elem) {

}

function createelement_withclasses(elem_type, inner_elem_text, attributes_arr, addclasslist) {
  var newelement = document.createElement(elem_type);
  if (inner_elem_text.length > 0) {
    newelement.innerText = inner_elem_text;
  }
  if (attributes_arr != "") {
    for (var attr_num = 0; attr_num < attributes_arr.length; attr_num++) {
      if (attr_num % 2 == 0) {
        var curr_attr = attributes_arr[attr_num];
      }
      if (attr_num % 2 == 1) {
        var curr_setting = attributes_arr[attr_num];
        newelement.setAttribute(curr_attr, curr_setting);
      }
    }
  }
  if (addclasslist != "") {
    for (var class_num = 0; class_num < addclasslist.length; class_num++) {
      newelement.classList.add(addclasslist[class_num]);
    }
  }
  return newelement;
}


function appendchain(prime_elem, list) {
  listlen = list.length;
  for (var i = 0; i < listlen; i++) {
    prime_elem.appendChild(list[i]);
  }
}

function clear_questionfield() {
  var questionfield = document.querySelector('#questionfield');
  var questionchildren = questionfield.children;
  // console.log('questionchildren length is: ',questionchildren.length);
  for (var question_num = 0; question_num < questionchildren.length; question_num++) {
    questionfield.children[0].remove();
  }
}

function not_eligible() {
  // write out reasons for not being eligible
  //createelement_withclasses(elem_type, inner_elem_text, attributes_arr, addclasslist)

  // share what resources the persone should get
  var time_score_elem = document.querySelector('#time_score');
  var resource_score_elem = document.querySelector('#resource_score');
  var skill_score_elem = document.querySelector('#skill_score');
  var min_score = Math.min(time_score, resource_score, skill_score);
  // console.log('min_score is:', min_score);
  if (min_score == 2) {
    var rec_improvement = 'Resources';
  }
  if (min_score == 1) {
    var rec_improvement = 'Time';
  }
  if (min_score == 3) {
    var rec_improvement = 'Skills';
  }


  var insights_elem = document.querySelector('.insights');
  var ineligible_reasons = createelement_withclasses('p', "based on this tool's calculations, the questions you answered indicate you are dealing with significant constraints. the recommended goal is to work on resolving the constraints and get more "+rec_improvement, '', '');
  insights_elem.appendChild(ineligible_reasons);

  // add lessons based on constraints
}

function select_subtask(elem_select) {
  var elem = elem_select.target;
  // update number
  var ul_elem = elem.parentElement;
  var ul_children = ul_elem.children;
  var number_elem = ul_children[1];
  // if selected
  if (elem.classList.contains('selected') == true) {
    elem.classList.remove('selected');
    var new_number = Number(number_elem.innerText) + 1;
    number_elem.innerText = new_number.toString();
  } else {
    elem.classList.add('selected');
    var new_number = Number(number_elem.innerText) - 1;
    number_elem.innerText = new_number.toString();
  }
}

function select_network_task(elem_select) {
  var elem = elem_select.target;
  // update number
  var ul_elem = elem.parentElement;
  var ul_children = ul_elem.children;
  // if selected
  if (elem.classList.contains('selected') == true) {
    elem.classList.remove('selected');
  } else {
    elem.classList.add('selected');
  }
}






function share_results() {
  // clear last questions
  clear_questionfield();
  // console.log('sharing results')
  // determine if eligible
  var questions_answered_elem = document.querySelector('#questions_answered');
  var current_category_elem = document.querySelector('#current_category');
  var constraint_score_elem = document.querySelector('#constraint_score');
  var time_score_elem = document.querySelector('#time_score');
  var resource_score_elem = document.querySelector('#resource_score');
  var skill_score_elem = document.querySelector('#skill_score');
  var skill_list_elem = document.querySelector('#skill_list');

  // evaluate eligibility
  var opportunity_score = Number(time_score_elem.innerText) + Number(resource_score_elem.innerText) + Number(skill_score_elem.innerText);
  if (opportunity_score > Number(constraint_score_elem.innerText)) {
    not_eligible();
  }

  // assess level 1 tasks filtered by time, resource, skill score
  var avail_lvl1_tasks = [];
  var time_score = Number(time_score_elem.innerText);
  var resource_score = Number(resource_score_elem.innerText);
  var skill_score = Number(skill_score_elem.innerText)/3;
  // console.log('skill_score is: ',skill_score);
  for (var task_num = 0; task_num < tasklvl1.length; task_num++) {
    task_obj = tasklvl1[task_num]
    // console.log('task_obj: ',task_obj)
    if (Number(task_obj['Skill Cost']) < skill_score) {
      if (Number(task_obj['Time Score']) < time_score) {
        if (Number(task_obj['Resource Cost']) < resource_score) {
          avail_lvl1_tasks.push(task_obj);
        }
      }
    }
  }
  // sort by impact score
  avail_lvl1_tasks.sort((a, b) => b['Impact Score'] - a['Impact Score']);

  // split array
  var cap = opportunity_score * 2;
  avail_lvl1_tasks.splice(cap, cap - avail_lvl1_tasks.length);
  // console.log('avail_lvl1_tasks: ',avail_lvl1_tasks);

  // build list counting types
  var all_categories = [];
  var blank_cat = {};
  blank_cat.category = 'Empty';
  blank_cat.count = 0;
  all_categories.push(blank_cat);
  var cat_counter = 0;
  var cat_located = 0;
  for (var task_num = 0; task_num < avail_lvl1_tasks.length; task_num++) {
    for (var cat_num = 0; cat_num < all_categories.length; cat_num++) {
      var task_cat = avail_lvl1_tasks[task_num]['Path Category']
      // if task_cat matches all_cat category, update number
      if (task_cat == all_categories[cat_num].category) {
        all_categories[cat_num].count += 1;
        cat_located = 1;
      } else {
        // if max, add category
        if (cat_num == cat_counter && cat_located != 1) {
          var new_cat = {};
          new_cat.category = task_cat;
          new_cat.count = 0;
          all_categories.push(new_cat);
          cat_counter += 1;
        }
      }
    }
    cat_located = 0;
  }
  // console.log('all_categories are: ',all_categories)

  // apply proportions to get task count
  let proportions = [
    {
      category: 'Material gains for workers',
      proportion: .5044,
    },
    {
      category: 'Organized Divestment',
      proportion: .3409,
    },
    {
      category: 'Collective Ownership',
      proportion: .0961,
    },
    {
      category: 'Democratized Use of Resources',
      proportion: .0578,
    },
    {
      category: 'Policies Preventing Greed',
      proportion: .0008,
    }
  ]

  var recommended_task_dist = []
  var total_cat_count = 0;
  for (cat_num = 0; cat_num < all_categories.length; cat_num++) {
    total_cat_count = total_cat_count + all_categories[cat_num].count;
  }

  for (cat_num = 0; cat_num < all_categories.length; cat_num++) {
    for (var prop_num = 0; prop_num < proportions.length; prop_num++) {
      var cat = all_categories[cat_num];
      var prop = proportions[prop_num];
      if (cat.category == prop.category) {
        var multiplier = total_cat_count * prop.proportion;
        // console.log('multiplier: ',multiplier, 'for category: ', cat.category);
        if (multiplier > cat.count) {
          var new_dist = {};
          new_dist.category = cat.category;
          new_dist.count = cat.count;
        } else {
          if (Math.floor(multiplier) < 1) {
            var new_dist = {};
            new_dist.category = cat.category;
            new_dist.count = 1;
          } else {
            var new_dist = {};
            new_dist.category = cat.category;
            new_dist.count = Math.floor(multiplier);
          }
        }
        recommended_task_dist.push(new_dist);
      }
    }
  }
  // console.log('recommended_task_dist: ',recommended_task_dist);


  // form network level 1 tasks
  var network_lvl1_tasks = [];
  var network_resource_score = Number(document.querySelector('#network_resource').innerText);
  var network_time_score = Number(document.querySelector('#network_time').innerText);
  var network_skill_score = Number(document.querySelector('#network_skill').innerText);
  for (var task_num = 0; task_num < tasklvl1.length; task_num++) {
    task_obj = tasklvl1[task_num]
    //console.log('task_obj: ',task_obj)
    if (Number(task_obj['Skill Cost']) < skill_score + network_skill_score) {
      if (Number(task_obj['Time Score']) < time_score + network_time_score) {
        if (Number(task_obj['Resource Cost']) < resource_score + network_resource_score) {
          // console.log('adding to network')
          network_lvl1_tasks.push(task_obj);
        }
      }
    }
  }
  // console.log('network_lvl1_tasks: ',network_lvl1_tasks);
  network_lvl1_tasks.sort((a, b) => b['Impact Score'] - a['Impact Score']);

  // get all level 2 tasks
  var avail_lvl2_tasks = [];
  for (lvl1_num = 0; lvl1_num < avail_lvl1_tasks.length; lvl1_num++) {
    for (lvl2_num = 0; lvl2_num <  tasklvl2.length; lvl2_num++) {
      var task2 = tasklvl2[lvl2_num];
      var task1 = avail_lvl1_tasks[lvl1_num];
      if (task1['Task'] == task2['Task Level 1']) {
        avail_lvl2_tasks.push(task2);
      }
    }
  }
  // console.log('avail_lvl2_tasks: ',avail_lvl2_tasks);

  var skills = document.querySelector('#skill_list').innerText;
  // console.log('skills are: ',skills);
  // for each in the available tasks
  for (var task_num = 0; task_num < avail_lvl1_tasks.length; task_num++) {
    // get the available task
    var avail_task = avail_lvl1_tasks[task_num];
    // set skill_match = 0
    var skill_match = 0;
    // split the skills
    var avail_split_skills = avail_task['Skills'].split(',');
    // for each skill_set (low, med, high)
    // console.log('avail_split_skills.length',avail_split_skills.length)
    for (var split_num = 1; split_num <= avail_split_skills.length; split_num++) {
      // set skill_match_curr = 0
      var skill_match_curr = 0;
      // console.log('avail_split_skills[split_num-1]: ',avail_split_skills[split_num-1]);
      var split_str = avail_split_skills[split_num-1];
      // for each letter in skills
      for (var skill_num = 0; skill_num < skills.length; skill_num++) {
        var curr_skill = skills[skill_num];
        if (split_str.includes(curr_skill) == true) {
          // console.log('matching curr_skill: ',curr_skill);
          skill_match_curr += 1;
        }
      }
      // after each skill is tallied for that string
      skill_match = skill_match + (skill_match_curr * split_num);
      // console.log('skill_match is:',skill_match);
    }
    avail_task['Skill Match Score'] = skill_match;
  }
  // console.log('avail_lvl1_tasks: ',avail_lvl1_tasks);



  // sort avail_lvl2_tasks by matching
  // 1. add matching to avail_lvl 2
  // 2. sort avail_lvl_2
  for (var lvl2_num = 0; lvl2_num < avail_lvl2_tasks.length; lvl2_num++) {
    for (var lvl1_num = 0; lvl1_num < avail_lvl1_tasks.length; lvl1_num++) {
      if (avail_lvl2_tasks[lvl2_num]['Task Level 1'] == avail_lvl1_tasks[lvl1_num]['Task']) {
        avail_lvl2_tasks[lvl2_num]['Skill Match Score'] = avail_lvl1_tasks[lvl1_num]['Skill Match Score'];
      }
    }
  }
  avail_lvl2_tasks.sort((a, b) => b['Skill Match Score'] - a['Skill Match Score']);
  // console.log('avail_lvl2_tasks: ',avail_lvl2_tasks)

  // update all categories level 2
  var all_categories_lvl2 = all_categories;
  var all_categories_lvl2_total = 0
  for (var cat_num = 0; cat_num < all_categories_lvl2; cat_num++) {
    all_categories_lvl2[cat_num].count = all_categories_lvl2[cat_num].count * 3;
    all_categories_lvl2_total += all_categories_lvl2[cat_num].count;
  }
  // console.log('all_categories_lvl2', all_categories_lvl2);

  // recommended hours and improvements:
  var rec_hours_per_week = Math.ceil(time_score/1.5);
  // console.log('time_score: ',time_score,' and resource_score: ',resource_score," and skill_score: ",skill_score);
  var min_score = Math.min(time_score, resource_score, skill_score * 3);
  // console.log('min_score is:', min_score);
  // standard improvement is skills if there is no minimum
  var rec_improvement = 'Skills';
  if (min_score == resource_score) {
    var rec_improvement = 'resources';
  }
  if (min_score == time_score) {
    var rec_improvement = 'time';
  }
  if (min_score == (skill_score * 3)) {
    var rec_improvement = 'skills';
  }
  // console.log('recommended hours: ',rec_hours_per_week);
  // console.log('recommended improvement: ',rec_improvement);

  var ask_friends_total = all_categories_lvl2.length/2;

  var insights_elem = document.querySelector('.insights');
  // create all elements
  // createelement_withclasses(elem_type, inner_elem_text, attributes_arr, addclasslist)
  // make a function to update number of actions remaining (tally)
  // add function as event listener to each list item
  var rec_time_elem = createelement_withclasses('h5', "the calculations suggest trying to spend " + rec_hours_per_week.toString() + " hours per week", "", "");
  var rec_avg_time_elem = createelement_withclasses('p', "the total calculations average to about 50% of time on mutual aid (or material gains for workers), 35% for organized divestment, 10% on collective ownership, 5% on democratizing resources and how they're used, and 1% on policies that prevent greed", "", "");
  var rec_improve_elem = createelement_withclasses('h5', "if you want to work on improving your situation, this tool recommends improving " + rec_improvement, "", "");
  appendchain(insights_elem, [rec_time_elem, rec_avg_time_elem, rec_improve_elem]);

  var intro_options = createelement_withclasses('h3', 'please consider the options below', '', '');
  insights_elem.appendChild(intro_options);

  for (var cat_num = 1; cat_num < all_categories_lvl2.length; cat_num++) {
    var all_cat_lvl2 = all_categories_lvl2[cat_num]
    var new_line = document.createElement('br');
    var tally_label = createelement_withclasses('h4', all_cat_lvl2.category, '', '');
    var tally = createelement_withclasses('h4', all_cat_lvl2.count.toString(), ['id', all_cat_lvl2.category + '-tally'], '');
    var task_list = createelement_withclasses('ul', '', '', ['checklist']);
    insights_elem.appendChild(new_line);
    task_list.appendChild(tally_label);
    task_list.appendChild(tally);
    for (var task_num = 0; task_num < avail_lvl2_tasks.length; task_num++) {
      var task = avail_lvl2_tasks[task_num]
      if (task['Path'] == all_cat_lvl2.category) {
        var task_elem = createelement_withclasses('li', task["Task Level 1"] + ": " + task['Subtask'], ['id', 'task'+task_num.toString()], ['subtask_list'])
        task_elem.addEventListener('click', select_subtask, false);
        task_list.appendChild(task_elem);
      }
    }
    insights_elem.appendChild(task_list);
  }


  var buttonfield_elem = document.querySelector('.buttonfield');
  var questionfield_elem = document.querySelector('.questions');
  buttonfield_elem.remove();
  questionfield_elem.remove();

  // add details for the network
  var network_cap = all_categories_lvl2.length;
  network_lvl1_tasks.splice(network_cap, network_lvl1_tasks.length - network_cap);
  console.log('network_lvl1_tasks: ',network_lvl1_tasks);

  // get all level 2 network tasks
  var network_lvl2_tasks = [];
  for (lvl1_num = 0; lvl1_num < network_lvl1_tasks.length; lvl1_num++) {
    for (lvl2_num = 0; lvl2_num <  tasklvl2.length; lvl2_num++) {
      var task2 = tasklvl2[lvl2_num];
      var task1 = network_lvl1_tasks[lvl1_num];
      if (task1['Task'] == task2['Task Level 1']) {
        network_lvl2_tasks.push(task2);
      }
    }
  }
  console.log('network_lvl2_tasks: ',network_lvl2_tasks);

  var network_intro = createelement_withclasses('h4', 'consider working with those around you on the following, as they may be in different circumstances: ', "", "");
  var network_list = createelement_withclasses('ul', '', ['id', 'networklist'], ['checklist']);

  for (var network_task_num = 0; network_task_num < network_lvl2_tasks.length; network_task_num++) {
    var network_task = network_lvl2_tasks[network_task_num];
    var network_elem = createelement_withclasses('li', network_task['Subtask'], ['id', 'network_task_' + network_task_num], ['subtask_list']);
    network_elem.addEventListener('click', select_network_task, false);
    network_list.appendChild(network_elem);
  }

  appendchain(insights_elem, [network_intro, network_list]);

}





function get_constraint_from_question(question) {
  for (var question_num = 0; question_num<questions.length; question_num++) {
    if (questions[question_num].Question == question) {
      return questions[question_num].Constraint
    }
  }
}

function get_constraint_score(constraint) {
  for (var constraint_num = 0; constraint_num < constraints.length; constraint_num++) {
    if (constraints[constraint_num].Constraint == constraint) {
      // console.log('constraint_score is: ',constraints[constraint_num].Severity / (constraint_num + 5));
      return constraints[constraint_num].Severity / (constraint_num + 5);
    }
  }
}

function update_answers() {
  // use answered question to update answers
  var questions_answered_elem = document.querySelector('#questions_answered');
  var current_category_elem = document.querySelector('#current_category');
  var constraint_score_elem = document.querySelector('#constraint_score');
  var time_score_elem = document.querySelector('#time_score');
  var resource_score_elem = document.querySelector('#resource_score');
  var skill_score_elem = document.querySelector('#skill_score');
  var skill_list_elem = document.querySelector('#skill_list');
  var last_q_bin_elem = document.querySelector('#lastqbin');

  var questions_answered_update = Number(questions_answered_elem.innerText) + 1;
  questions_answered_elem.innerText = questions_answered_update.toString();
  // console.log('questions answered is now: ', questions_answered_update)

  var question = document.querySelector('#current_question').innerText;
  // console.log('question is: ',question);
  var label = document.querySelector('.checkbox-wrapper-34').children[1];
  var answer = getComputedStyle(label, '::before').content;
  // console.log('answer is: ',answer);
  // console.log('typeof answer is: ',typeof(answer))


  if (answer.toString() == '"Yes"') {
    // update if constraint
    if (current_category_elem.innerText == 'Condition') {
      var constraint = get_constraint_from_question(question);
      var add_constraint = get_constraint_score(constraint);
      var new_score = Number(constraint_score_elem.innerText) + add_constraint;
      constraint_score_elem.innerText = new_score.toString();
    }
    // update if time
    if (current_category_elem.innerText == 'Time') {
      var new_score = Number(time_score_elem.innerText) + 0.5;
      time_score_elem.innerText = new_score.toString();
    }
    // update if resource
    if (current_category_elem.innerText == 'Resource') {
      var new_score = Number(resource_score_elem.innerText) + 1;
      resource_score_elem.innerText = new_score.toString();
    }
    // update if skill
    if (current_category_elem.innerText == 'Skill') {
      var new_score = Number(skill_score_elem.innerText) + 1;
      skill_score_elem.innerText = new_score.toString();
      for (var question_num = 0; question_num < questions.length; question_num++) {
        var active_question_obj = questions[question_num]
        if (question == active_question_obj.Question) {
          for (var skill_num=0; skill_num < skill_ids.length; skill_num++) {
            var active_skill_obj = skill_ids[skill_num]
            if (active_skill_obj.Skill == active_question_obj.Skill) {
              skill_list_elem.innerText = skill_list_elem.innerText + active_skill_obj.Skill_ID
            }
          }
        }
      }
    }
  }

  // update if network
  if (current_category_elem.innerText == 'Network') {
    if (answer.toString() == '"Yes"') {
      var new_network_score = 1;
    } else {
      var new_network_score = -1;
    }
    if (questions_answered_update == 1) {
      var network_resource_elem = document.querySelector('#network_resource');
      network_resource_elem.innerText = new_network_score.toString();
    }
    if (questions_answered_update == 2) {
      var network_time_elem = document.querySelector('#network_time');
      network_time_elem.innerText = new_network_score.toString();
    }
    if (questions_answered_update == 3) {
      var network_skill_elem = document.querySelector('#network_skill');
      network_skill_elem.innerText = new_network_score.toString();
    }
  }

  // update category if lastqni
  if (last_q_bin_elem.value == 'true') {
    if (current_category_elem.innerText == 'Network') {
      // don't add any more questions, it's over
      share_results();
    } else {
      // console.log('time to update question category');
      questions_answered_update = 0;
      questions_answered_elem.innerText = questions_answered_update.toString();
      if (current_category_elem.innerText == 'Skill') {
        current_category_elem.innerText = 'Network';
      }
      if (current_category_elem.innerText == 'Resource') {
        current_category_elem.innerText = 'Skill';
      }
      if (current_category_elem.innerText == 'Time') {
        current_category_elem.innerText = 'Resource';
      }
      if (current_category_elem.innerText == 'Condition') {
        current_category_elem.innerText = 'Time';
      }
      last_q_bin_elem.value = false;
    }
  }

  // add next question
  // add_question(current_category_elem.innerText, questions_answered_update);
  // console.log('last_q_bin_elem.value: ',last_q_bin_elem.value);
  // console.log("last_q_bin_elem.value != 'true': ",last_q_bin_elem.value != 'true');
  // console.log('current_category_elem.innerText: ', current_category_elem.innerText);
  // console.log("current_category_elem.innerText != 'Network':", current_category_elem.innerText != 'Network');
  // console.log('questions_answered_update: ', questions_answered_update);
  // console.log("questions_answered_update != 3: ", questions_answered_update != 3)

  if (last_q_bin_elem.value != 'true' || current_category_elem.innerText != 'Network' || questions_answered_update != 3) {
    add_question(current_category_elem.innerText, questions_answered_update);
  }
}






function add_question(type, questions_answered) {
  clear_questionfield();
  // console.log('type for this question is: ',type);
  // count questions of that type
  var question_total = questions.length;
  // console.log('question_total is: ',question_total);
  var type_count = 0;
  for (var question_num = 0; question_num < question_total; question_num++) {
    var question = questions[question_num];
    if (question.Category == type) {
      type_count += 1;
      // if first question, mark start of questions
      // if (type_count == 1) {
      //   var question_start = question_num
      // }
    }
  }
  // if question_count == type_count, return last question
  // console.log('type_count is: ',type_count);
  var last_q_bin = false;
  if (questions_answered == (type_count - 1)) {
    last_q_bin = true;
    var last_q_bin_elem = document.querySelector('#lastqbin');
    last_q_bin_elem.value = true;
  }

  // pull next question
  // var next_question = questions[question_start + questions_answered]
  var question_track = 0;
  // console.log('question_total is: ',question_total);
  var questions_answered_str = questions_answered.toString();
  for (var question_num = 0; question_num < question_total; question_num++) {
    var question = questions[question_num];
    if (question.Category == type) {
      // if constraint question
      if (Number.isNaN(question.Constraint) == false) {
        // console.log('question.Constraint != NaN');
        if (question_track == questions_answered) {
          var next_question = question;
        }
      } else {
        // form order match
        if (questions_answered < 10) {
          ordermatch = type.toUpperCase()[0] + "0" + questions_answered_str;
        } else {
          ordermatch = type.toUpperCase()[0] + questions_answered_str;
        }
        // console.log('ordermatch is: ',ordermatch);
        if (question.Order == ordermatch) {
          var next_question = question;
        }
      }

      question_track += 1;
    }
  }

  // console.log('next_question is: ', next_question);

  // add question to page
  var questionfield = document.querySelector('#questionfield');
  var fieldchildren = questionfield.children;
  // console.log('fieldchildren length is: ',fieldchildren.length);
  if (fieldchildren.length == 1) {
    questionfield.children[0].remove()
  }
  var current_question = createelement_withclasses('p', next_question.Question, ['id', "current_question"], ['question', 'adjust-text'])
  questionfield.append(current_question);

  // add answer buttons
  var answer_div = createelement_withclasses('div', '', '', ['checkbox-wrapper-34']);
  var answer_input = createelement_withclasses('input', '', ['id', 'toggle-34', 'type', 'checkbox'], ['tgl', 'tgl-ios']);
  var answer_label = createelement_withclasses('label', '', ['for', 'toggle-34'], ['tgl-btn']);

  appendchain(answer_div, [answer_input, answer_label]);
  questionfield.append(answer_div);

  // add submit button
  var submit_button = createelement_withclasses('button', 'submit', ['id', 'submitbutton', 'role', 'button'], ['button-30']);
  submit_button.addEventListener('click', update_answers, false);
  questionfield.append(submit_button);

}







// once only functions

// start questions
function startquestions() {
  var introfield = document.querySelector('#introfield');
  var introchildren = introfield.children;
  // console.log('introchildren length is: ',introchildren.length);
  for (var intro_num = 0; intro_num < introchildren.length; intro_num++) {
    introfield.children[1].remove();
  }
  add_question('Condition', 0);
  var begin_button = document.querySelector('#beginbutton');
  begin_button.remove();
}


// calculate constraints
function calculate_constraints() {

}
