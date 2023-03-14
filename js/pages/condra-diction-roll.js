
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) +  min);
};

function addeffect(roll) {
  var rolleffectplace = document.getElementById('rolleffect');
  for (i=0; i<rolldata.length; i++) {
    if(roll == i+1) {
      var rollnum = document.createElement("h1");
      rollnum.textContent = roll;
      rollnum.setAttribute("id","roll-number");
      var rolleffect = document.createElement("h1");
      rolleffect.textContent = rolldata[i].text;
      rolleffect.setAttribute("id", "effect-text");
      rolleffectplace.appendChild(rollnum);
      rolleffectplace.appendChild(rolleffect);
    };
  };
};

function removeeffect() {
  var rolleffectplace = document.getElementById('rolleffect');
  //console.log("roll effect place children are: ",rolleffectplace.children)
  var rollchildren = rolleffectplace.children
  var countchildren = rollchildren.length
  for (i = 0; i<countchildren; i++) {
    //console.log("child is: ",rollchildren[0])
    rollchildren[0].remove()
  }
}


$(document).ready(function() {

  const rolleffectplace = document.getElementById('rolleffect')
  const roll_btn = document.querySelector(".roll-btn")

  roll_btn.addEventListener('click', function(e) {
    removeeffect();

    var roll = getRandomInt(1,21);

    addeffect(roll);
  })

});
