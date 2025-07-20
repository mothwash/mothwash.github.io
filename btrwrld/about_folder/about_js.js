// on load
$(document).ready(function() {
  var linked_toc = document.querySelector('#linked_toc');
  var linked_toc_children = linked_toc.children;
  for (var i=0; i<linked_toc_children.length; i++) {
    var child = linked_toc_children[i];
    child.addEventListener('click', go_to_elem, false);
  }
});

function go_to_elem(elem) {
  var list_elem = elem.target;
  var targetclass = list_elem.classList[0];
  var targets = document.getElementsByClassName(targetclass)
  var new_target = targets[1];
  new_target.scrollIntoView();
}

function return_to_top() {
  var linked_toc = document.querySelector('#linked_toc');
  linked_toc.scrollIntoView(); 
}
