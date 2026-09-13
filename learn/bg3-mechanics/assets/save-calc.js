// Saving-throw calculator. Usage: <div class="tool" data-savecalc></div>
// Optional attributes set the start values: data-dc="13" data-bonus="-1" data-mode="flat|dis".
// Model: the target rolls d20 + save bonus and succeeds when the result equals or exceeds
// the Spell Save DC. BG3 gives no auto-success on a natural 20 and no auto-failure on a
// natural 1 for saving throws, so the tool only counts die faces.
(function () {
  document.querySelectorAll('[data-savecalc]').forEach(function (el) {
    var dc0 = el.getAttribute('data-dc') || '13';
    var bonus0 = el.getAttribute('data-bonus') || '-1';
    var mode0 = el.getAttribute('data-mode') || 'flat';
    el.innerHTML =
      '<label>Spell Save DC <input type="number" name="dc" value="' + dc0 + '"></label>' +
      '<label>Target save bonus <input type="number" name="bonus" value="' + bonus0 + '"></label>' +
      '<label>Save mode <select name="mode">' +
        '<option value="flat"' + (mode0 === 'flat' ? ' selected' : '') + '>Flat</option>' +
        '<option value="dis"' + (mode0 === 'dis' ? ' selected' : '') + '>Target has disadvantage</option>' +
      '</select></label>' +
      '<div class="readout"></div>';
    var out = el.querySelector('.readout');
    function calc() {
      var dc = +el.querySelector('[name=dc]').value;
      var bonus = +el.querySelector('[name=bonus]').value;
      var mode = el.querySelector('[name=mode]').value;
      var need = dc - bonus; // lowest die face on which the target saves
      var faces = Math.min(20, Math.max(0, 21 - need)); // faces that save
      var pSave = faces / 20;
      var pSaveMode = mode === 'dis' ? pSave * pSave : pSave;
      var land = 1 - pSaveMode;
      var needTxt = need <= 1 ? 'any face' : need > 20 ? 'no face' : need + ' or higher';
      var pct = function (x) { return Math.round(x * 1000) / 10 + '%'; };
      out.innerHTML =
        'The target needs <b>' + needTxt + '</b> on the d20. That is ' + faces + ' of 20 faces.<br>' +
        'The target saves ' + pct(pSaveMode) + ' of the time.<br>' +
        '<strong>' + pct(land) + '</strong> chance the spell lands' +
        (mode === 'dis' ? ' (a flat save gives ' + pct(1 - pSave) + ')' : '') + '.';
    }
    el.addEventListener('input', calc); calc();
  });
})();
