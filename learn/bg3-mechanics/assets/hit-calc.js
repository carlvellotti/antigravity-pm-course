// Hit-chance calculator. Usage: <div class="tool" data-hitcalc></div>
(function () {
  document.querySelectorAll('[data-hitcalc]').forEach(function (el) {
    el.innerHTML =
      '<label>Attack bonus <input type="number" name="bonus" value="5"></label>' +
      '<label>Target AC <input type="number" name="ac" value="13"></label>' +
      '<label>Roll mode <select name="mode"><option value="flat">Flat</option><option value="adv">Advantage</option><option value="dis">Disadvantage</option></select></label>' +
      '<div class="readout"></div>';
    var out = el.querySelector('.readout');
    function calc() {
      var bonus = +el.querySelector('[name=bonus]').value, ac = +el.querySelector('[name=ac]').value, mode = el.querySelector('[name=mode]').value;
      var need = ac - bonus; // minimum die face that hits
      var faces = 0; for (var d = 1; d <= 20; d++) { if (d === 20 || (d !== 1 && d >= need)) faces++; }
      var p = faces / 20, q = 1 - p;
      var chance = mode === 'adv' ? 1 - q * q : mode === 'dis' ? p * p : p;
      var needTxt = need <= 2 ? 'anything but a 1' : need >= 20 ? 'a natural 20' : need + ' or higher';
      out.innerHTML = 'You need <b>' + needTxt + '</b> on the d20. That is ' + faces + ' of 20 faces.<br>' +
        '<strong>' + Math.round(chance * 100) + '%</strong> to hit' + (mode !== 'flat' ? ' (flat would be ' + Math.round(p * 100) + '%)' : '') + '.';
    }
    el.addEventListener('input', calc); calc();
  });
})();
