import { JSDOM } from 'jsdom';
import { readFileSync, readdirSync } from 'node:fs';

const js = readFileSync('dist-smoke/assets/' +
  readdirSync('dist-smoke/assets').find((f) => f.endsWith('.js')), 'utf8');

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'http://localhost/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
dom.window.eval(js);

const tick = () => new Promise((r) => setTimeout(r, 20));
const text = () => dom.window.document.body.textContent;
const klick = async (selektorText) => {
  const knopf = [...dom.window.document.querySelectorAll('button')]
    .find((b) => b.textContent.includes(selektorText));
  if (!knopf) throw new Error(`Button "${selektorText}" nicht gefunden. Sichtbar: ` +
    [...dom.window.document.querySelectorAll('button')].map((b) => b.textContent.trim()).join(' | '));
  knopf.click();
  await tick();
};
const erwarte = (s) => {
  if (!text().includes(s)) throw new Error(`Erwartet "${s}", Seite zeigt: ${text().slice(0, 300)}`);
  console.log(`✓ ${s}`);
};
const schloesser = () => (text().match(/🔒/g) || []).length;

await tick();

// Startseite: Welten-Menü
erwarte('RentenHeld');
erwarte('Daily Challenge');
erwarte('Themenwelten');
erwarte('Entgeltumwandlung');
erwarte('BetrAVG-Basics');
erwarte('Berühmte Urteile');
erwarte('Bald verfügbar');

// Welt öffnen: nur Lektion 1 ist anfangs freigeschaltet
await klick('Entgeltumwandlung');
erwarte('Die Grundidee');
if (schloesser() !== 4) throw new Error(`Erwartet 4 gesperrte Lektionen, gefunden: ${schloesser()}`);
console.log('✓ Lektionen 2–5 anfangs gesperrt');

// Lektion 1 starten
await klick('Start');
erwarte('Frage 1 von 5');
erwarte('Was bedeutet Entgeltumwandlung?');

// Richtig antworten -> Erklärung + XP
await klick('Ein Teil des Bruttogehalts');
erwarte('Richtig! +10 XP');
erwarte('BEVOR Steuern und Sozialabgaben');

// Weiter -> Mythos/Fakt-Frage, falsch antworten
await klick('Weiter');
erwarte('Frage 2 von 5');
erwarte('Mythos oder Fakt?');
await klick('Mythos');
erwarte('Leider daneben.');

// Durchklicken bis zum Abschluss
for (let i = 3; i <= 5; i++) {
  await klick('Weiter');
  erwarte(`Frage ${i} von 5`);
  if (dom.window.document.querySelector('input[type=range]')) {
    await klick('Schätzung abgeben');
  } else {
    [...dom.window.document.querySelectorAll('button')].find((b) => !b.disabled).click();
    await tick();
  }
}
await klick('Lektion abschließen');
erwarte('Lektion geschafft!');

// Zurück zur Welt: Lektion erledigt, Lektion 2 freigeschaltet
await klick('Zur Übersicht');
erwarte('✅ Die Grundidee');
if (schloesser() !== 3) throw new Error(`Lektion 2 sollte frei sein, gesperrt: ${schloesser()}`);
console.log('✓ Lektion 2 nach Abschluss freigeschaltet');

// Zurück zur Startseite: Fortschritt, Streak und XP sichtbar
await klick('Zurück');
erwarte('Themenwelten');
erwarte('1/5 Lektionen');
erwarte('🔥 1 Tage');
const xp = text().match(/⭐ (\d+)/);
console.log(`✓ XP gesammelt: ${xp[1]}`);
if (Number(xp[1]) <= 0) throw new Error('Keine XP gutgeschrieben');

// Daily Challenge spielen
await klick('Spielen');
if (dom.window.document.querySelector('input[type=range]')) {
  await klick('Schätzung abgeben');
} else {
  [...dom.window.document.querySelectorAll('button')].find((b) => !b.disabled && !b.textContent.includes('Übersicht')).click();
  await tick();
}
erwarte('Ergebnis teilen');
await klick('Zur Übersicht');
erwarte('Heute schon gemeistert');

console.log('\nALLE SMOKE-TESTS BESTANDEN');
