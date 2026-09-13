// Turn planner widgets for the BG3 mechanics course. Two independent tools in one file.
//
// 1. Turn checklist. Usage:
//      <div class="tool" data-turnplanner></div>
//    Renders one checkbox per turn resource (Action, Bonus Action, Movement, Reaction set),
//    a readout of what is still unspent, and a Reset button for the next turn.
//
// 2. Concentration save calculator. Usage:
//      <div class="tool" data-concsave></div>
//      <div class="tool" data-concsave data-profbonus="3"></div>
//    Inputs: damage taken, Constitution modifier, proficient in Constitution saves yes or no.
//    Output: the DC, the die face needed, and the percent chance to hold concentration.
//    The optional data-profbonus attribute sets the proficiency bonus. The default is 2 (levels 1 to 4).
//    Rules used: DC = 10 or half the damage, whichever is higher. A natural 1 fails. A natural 20 succeeds.
(function () {
  var RESOURCES = [
    { key: 'action', label: 'Action spent' },
    { key: 'bonus', label: 'Bonus Action spent' },
    { key: 'move', label: 'Movement spent' },
    { key: 'reaction', label: 'Reaction set for the enemy turn' }
  ];

  document.querySelectorAll('[data-turnplanner]').forEach(function (el) {
    el.innerHTML = RESOURCES.map(function (r) {
      return '<label style="flex-direction:row;align-items:center;gap:.45rem;font-size:.95rem;color:inherit">' +
        '<input type="checkbox" name="' + r.key + '"> ' + r.label + '</label>';
    }).join('') +
      '<div><button type="button" name="reset">Reset for the next turn</button></div>' +
      '<div class="readout"></div>';

    var boxes = RESOURCES.map(function (r) { return el.querySelector('[name=' + r.key + ']'); });
    var out = el.querySelector('.readout');

    function draw() {
      var left = RESOURCES.filter(function (r, i) { return !boxes[i].checked; });
      if (left.length === 0) {
        out.innerHTML = '<strong>4 of 4</strong> resources used. The turn is complete.';
      } else {
        var names = left.map(function (r) { return r.label.replace(/ (spent|set for the enemy turn)$/, ''); });
        out.innerHTML = '<strong>' + (4 - left.length) + ' of 4</strong> resources used.<br>Still open: ' + names.join(', ') + '.';
      }
    }

    el.addEventListener('change', draw);
    el.querySelector('[name=reset]').addEventListener('click', function () {
      boxes.forEach(function (b) { b.checked = false; });
      draw();
    });
    draw();
  });

  document.querySelectorAll('[data-concsave]').forEach(function (el) {
    var prof = +(el.getAttribute('data-profbonus') || 2);
    el.innerHTML =
      '<label>Damage taken <input type="number" name="dmg" value="7" min="0"></label>' +
      '<label>Constitution modifier <input type="number" name="con" value="2"></label>' +
      '<label>Proficient <select name="prof"><option value="1">Yes (+' + prof + ')</option><option value="0">No</option></select></label>' +
      '<div class="readout"></div>';
    var out = el.querySelector('.readout');

    function calc() {
      var dmg = +el.querySelector('[name=dmg]').value;
      var con = +el.querySelector('[name=con]').value;
      var bonus = con + (el.querySelector('[name=prof]').value === '1' ? prof : 0);
      var dc = Math.max(10, Math.floor(dmg / 2));
      var faces = 0;
      for (var d = 2; d <= 20; d++) { if (d === 20 || d + bonus >= dc) faces++; }
      var need = dc - bonus;
      var needTxt = need <= 2 ? '2 or higher, because a natural 1 fails' : need > 20 ? 'a natural 20' : need + ' or higher';
      out.innerHTML = 'DC <strong>' + dc + '</strong><br>' +
        'Save bonus +' + bonus + '. You need <b>' + needTxt + '</b>. That is ' + faces + ' of 20 faces.<br>' +
        '<strong>' + Math.round(faces / 20 * 100) + '%</strong> to hold the spell.';
    }

    el.addEventListener('input', calc);
    calc();
  });
})();
