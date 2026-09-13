// Damage-after-resistance calculator. Usage: <div class="tool" data-damagecalc></div>
// Optional: data-damagecalc="12" sets the starting base damage.
// Rules from bg3.wiki, Resistances: resistance halves and rounds down, vulnerability
// doubles, immunity reduces to 0, resistance and vulnerability cancel each other.
(function () {
  var RULES = {
    normal: {
      label: 'Normal',
      apply: function (d) { return d; },
      why: 'The target has no resistance and no vulnerability, so the damage does not change.'
    },
    resistant: {
      label: 'Resistant',
      apply: function (d) { return Math.floor(d / 2); },
      why: 'Resistance halves the damage and rounds the result down.'
    },
    vulnerable: {
      label: 'Vulnerable',
      apply: function (d) { return d * 2; },
      why: 'Vulnerability doubles the damage.'
    },
    immune: {
      label: 'Immune',
      apply: function () { return 0; },
      why: 'Immunity reduces the damage to 0.'
    },
    both: {
      label: 'Resistant and vulnerable',
      apply: function (d) { return d; },
      why: 'Resistance and vulnerability to the same type cancel each other, so the damage does not change.'
    }
  };
  var ORDER = ['normal', 'resistant', 'vulnerable', 'immune', 'both'];

  document.querySelectorAll('[data-damagecalc]').forEach(function (el) {
    var start = parseInt(el.getAttribute('data-damagecalc'), 10);
    if (!(start > 0)) { start = 9; }
    el.innerHTML =
      '<label>Base damage <input type="number" name="base" min="0" value="' + start + '"></label>' +
      '<label>Target state <select name="state">' +
      ORDER.map(function (k) { return '<option value="' + k + '">' + RULES[k].label + '</option>'; }).join('') +
      '</select></label>' +
      '<div class="readout"></div>';
    var out = el.querySelector('.readout');
    function calc() {
      var base = +el.querySelector('[name=base]').value;
      if (!(base >= 0)) { base = 0; }
      var rule = RULES[el.querySelector('[name=state]').value];
      out.innerHTML = 'The target takes <strong>' + rule.apply(base) + '</strong> damage.<br>' + rule.why;
    }
    el.addEventListener('input', calc); calc();
  });
})();
