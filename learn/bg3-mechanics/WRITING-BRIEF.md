# Writing brief for lessons and reference sheets

## Language: ASD-STE100 Simplified Technical English
Apply these STE rules to all prose in lessons and reference documents. Quoted source text inside `<span class="cite">` or blockquotes may stay verbatim.

- Use short sentences. Procedural sentences: 20 words maximum. Descriptive sentences: 25 words maximum. One topic per sentence.
- Paragraphs: 6 sentences maximum. One topic per paragraph.
- Use the active voice. Say who does what. "The game rolls a d20." Not "A d20 is rolled."
- Use the imperative for instructions. "Open the combat log." Not "You should open the combat log."
- Use simple tenses only: present, past, future. No -ing verb forms used as nouns or as continuous tense. No "would", "could", "might" for hedging.
- Use one word for one meaning. Once a term is chosen, do not use a synonym. Approved terms for this course: attack roll, saving throw, Spell Save DC, Armour Class (AC), advantage, disadvantage, proficiency bonus, ability modifier, resistance, vulnerability, immunity, condition, action, bonus action, reaction, movement, concentration, turn, round.
- Use articles ("the", "a") and demonstratives ("this") to make the noun clear. Do not drop them.
- Do not use idioms, slang, humour, or figurative language. No "trip up", "bake in", "the needle", "on faith".
- Do not use contractions.
- Use "not" for negatives, placed close to the verb.
- Write numbers as digits. Write percentages as "65 percent" in prose and "65%" in tables.
- Warnings and cautions come before the instruction they refer to, in their own sentence.
- Lists: one item per line, parallel structure, each item a complete sentence or a noun phrase, not mixed.
- Headings are noun phrases.

## Workspace conventions
- Lessons: `lessons/NNNN-dash-case.html`. Reference sheets: `reference/dash-case.html`. Both link `../assets/course.css`. Lessons also load `../assets/quiz.js` and may load `../assets/hit-calc.js`.
- Copy the HTML skeleton, class names, and section pattern from `lessons/0001-where-the-hit-chance-comes-from.html`. Reuse `.formula`, `.aside`, `.cite`, `.tool`, `.quiz`, `nav.links`, `.followup`.
- Quiz widget: `<div class="quiz" data-quiz='{"q":"...","options":[...],"answer":N,"why":"..."}'></div>`. All options must have the same word count. 3 to 5 quizzes per lesson.
- Every factual claim carries a `<span class="cite">` link to a source listed in `RESOURCES.md`. If you need a source not listed there, add it to `RESOURCES.md` in the same format.
- Each lesson: one skill, readable in 10 minutes or less, a "Primary source" section, a "Practice" section with one concrete thing to do in the next fight, the `.followup` reminder to ask the teacher, and `nav.links` to the reference sheet, MISSION.md, RESOURCES.md, and the previous lesson.
- Running examples: the learner's Sorcerer (Charisma 16, level 2, proficiency +2, Spell Save DC 13) and Gale as an Evocation Wizard (Intelligence 17).
- If a lesson needs a new reusable widget, put it in `assets/` with a comment on usage. Do not inline it.
- Do not change `assets/course.css`.
