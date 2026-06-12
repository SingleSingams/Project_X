import welt from '../data/entgeltumwandlung.json';

// Alle Fragen aller Welten in einen Pool legen (später einfach weitere Welten importieren)
const fragenPool = welt.lektionen.flatMap((l) => l.fragen);

// Einfacher deterministischer Hash, damit alle Spieler am selben Tag
// dieselbe Frage sehen – ganz ohne Server
function datumsHash(datumsString) {
  let hash = 0;
  for (let i = 0; i < datumsString.length; i++) {
    hash = (hash * 31 + datumsString.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function dailyFrage(datumsString) {
  return fragenPool[datumsHash(datumsString) % fragenPool.length];
}

export function shareText(datumsString, richtig) {
  const [jahr, monat, tag] = datumsString.split('-');
  const ergebnis = richtig ? '🟩 gelöst!' : '🟥 verhauen!';
  return (
    `RentenHeld-Daily ${tag}.${monat}.${jahr} ${ergebnis}\n` +
    `Wie gut kennst DU dich mit deiner Betriebsrente aus?\n` +
    window.location.origin
  );
}

export async function teilen(text) {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return 'geteilt';
    } catch {
      return 'abgebrochen';
    }
  }
  await navigator.clipboard.writeText(text);
  return 'kopiert';
}
