// Reusable quiz widget. Usage:
//   <div class="quiz" data-quiz='{"q":"...","options":["a","b","c"],"answer":1,"why":"..."}'></div>
// Options should have matching word counts so formatting gives nothing away.
(function () {
  document.querySelectorAll('.quiz[data-quiz]').forEach(function (el) {
    var spec = JSON.parse(el.getAttribute('data-quiz'));
    var q = document.createElement('p'); q.className = 'q'; q.textContent = spec.q; el.appendChild(q);
    var why = document.createElement('p'); why.className = 'why';
    var buttons = spec.options.map(function (text, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; b.textContent = text;
      b.addEventListener('click', function () {
        buttons.forEach(function (x) { x.disabled = true; });
        if (i === spec.answer) { b.classList.add('right'); why.className = 'why right'; why.textContent = 'Correct. ' + spec.why; }
        else { b.classList.add('wrong'); buttons[spec.answer].classList.add('right'); why.className = 'why wrong'; why.textContent = 'Not quite. ' + spec.why; }
      });
      el.appendChild(b); return b;
    });
    el.appendChild(why);
  });
})();
