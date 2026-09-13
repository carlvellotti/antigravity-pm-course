// Condition lookup widget. Usage:
//   <div class="tool" data-condition-lookup></div>
// The widget builds a select of control conditions. On change it shows one card with
// four rows: what the creature cannot do, what attackers get, which saving throws it
// fails, and how the condition ends.
//
// The data lives in CONDITIONS below so that a later lesson or reference sheet can
// reuse it. Read it from another script with window.BG3_CONDITIONS.
// Every entry carries a wiki URL. Add a new entry in the same shape:
//   { name, cannot, attackers, saves, ends, source }
(function () {
  var CONDITIONS = [
    {
      name: 'Prone',
      cannot: 'Cannot move or take actions, bonus actions, or reactions. Standing up costs half the movement speed.',
      attackers: 'Attack rolls against it have advantage, but only from within 3 m.',
      saves: 'Disadvantage on Strength and Dexterity saving throws.',
      ends: 'Usually after 2 turns. Grease, ice, and Throw give 1 turn. A creature that falls Prone on its own turn ends the turn and loses concentration.',
      source: 'https://bg3.wiki/wiki/Prone_(Condition)'
    },
    {
      name: 'Paralysed',
      cannot: 'Cannot move or take actions, bonus actions, or reactions.',
      attackers: 'Attack rolls against it have advantage. An attack from within 3 m that hits is always a critical hit.',
      saves: 'Automatically fails all Strength and Dexterity saving throws.',
      ends: 'When the duration of the source ends. Sources include Ghoulish Touch, ghoul and ghast claws, and Paralysing Ray.',
      source: 'https://bg3.wiki/wiki/Paralysed_(Condition)'
    },
    {
      name: 'Hold Person',
      cannot: 'Cannot move or take actions, bonus actions, or reactions.',
      attackers: 'Attack rolls against it succeed automatically. An attack from within 3 m is always a critical hit.',
      saves: 'Automatically fails Strength and Dexterity saving throws.',
      ends: 'At the end of each turn the creature rolls a Wisdom saving throw against your Spell Save DC. A success removes the condition. Damage to you can break the concentration.',
      source: 'https://bg3.wiki/wiki/Hold_Person'
    },
    {
      name: 'Stunned',
      cannot: 'Cannot move or take actions, bonus actions, or reactions. The condition also breaks concentration.',
      attackers: 'Attack rolls against it have advantage.',
      saves: 'Automatically fails Strength and Dexterity saving throws.',
      ends: 'At the end of the turn of the affected creature.',
      source: 'https://bg3.wiki/wiki/Stunned_(Condition)'
    },
    {
      name: 'Sleeping',
      cannot: 'Cannot move or act.',
      attackers: 'Attack rolls against it have advantage. Any hit from within 1.5 m is a critical hit.',
      saves: 'Automatically fails Strength and Dexterity saving throws.',
      ends: 'On damage, on the Wet condition, on Help, or on a Shove.',
      source: 'https://bg3.wiki/wiki/Sleeping_(Condition)'
    },
    {
      name: 'Restrained',
      cannot: 'Cannot move. Its own attack rolls have disadvantage.',
      attackers: 'Attack rolls against it have advantage.',
      saves: 'Disadvantage on Dexterity saving throws.',
      ends: 'When the duration of the source ends. Sources include Whirlwind and the Restraining Curse.',
      source: 'https://bg3.wiki/wiki/Restrained_(Condition)'
    },
    {
      name: 'Enwebbed',
      cannot: 'Cannot move. Its own attack rolls have disadvantage.',
      attackers: 'Attack rolls against it have advantage.',
      saves: 'Disadvantage on Dexterity saving throws.',
      ends: 'After 1 turn. The Web surface applies the condition again while the creature stays in the web.',
      source: 'https://bg3.wiki/wiki/Enwebbed_(Condition)'
    },
    {
      name: 'Blinded',
      cannot: 'Cannot make opportunity attacks. The range of its attacks and spells drops to 3 m.',
      attackers: 'Attack rolls against it have advantage.',
      saves: 'No effect on saving throws. Its own attack rolls have disadvantage.',
      ends: 'The duration falls at the start of each turn. Blindness lasts 10 turns, and the target rolls a Constitution saving throw at the end of each turn to remove it.',
      source: 'https://bg3.wiki/wiki/Blinded_(Condition)'
    },
    {
      name: 'Frightened',
      cannot: 'Cannot move. Its ability checks and attack rolls have disadvantage.',
      attackers: 'Attack rolls against it are normal. This condition gives no advantage.',
      saves: 'No effect on saving throws.',
      ends: 'At the end of the turn. Only one version of Frightened is active at a time.',
      source: 'https://bg3.wiki/wiki/Frightened_(Condition)'
    },
    {
      name: 'Threatened',
      cannot: 'Cannot make ranged attack rolls without disadvantage while a hostile creature is in melee range.',
      attackers: 'Attack rolls against it are normal. This condition gives no advantage.',
      saves: 'No effect on saving throws. Melee attacks and spells that use a saving throw are not affected.',
      ends: 'When no hostile creature stands in melee range.',
      source: 'https://bg3.wiki/wiki/Threatened_(Condition)'
    }
  ];

  window.BG3_CONDITIONS = CONDITIONS;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  document.querySelectorAll('[data-condition-lookup]').forEach(function (el) {
    var options = CONDITIONS.map(function (c, i) {
      return '<option value="' + i + '">' + esc(c.name) + '</option>';
    }).join('');
    el.innerHTML =
      '<label>Condition <select name="condition">' + options + '</select></label>' +
      '<div class="readout"></div>';
    var out = el.querySelector('.readout');
    function show() {
      var c = CONDITIONS[+el.querySelector('[name=condition]').value];
      out.innerHTML =
        '<strong>' + esc(c.name) + '</strong><br>' +
        '<b>The creature cannot:</b> ' + esc(c.cannot) + '<br>' +
        '<b>Attackers get:</b> ' + esc(c.attackers) + '<br>' +
        '<b>Saving throws:</b> ' + esc(c.saves) + '<br>' +
        '<b>The condition ends:</b> ' + esc(c.ends) + '<br>' +
        '<a href="' + esc(c.source) + '">bg3.wiki</a>';
    }
    el.addEventListener('change', show);
    show();
  });
})();
