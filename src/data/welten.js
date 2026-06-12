import entgeltumwandlung from './entgeltumwandlung.json';
import betravg from './betravg.json';
import durchfuehrungswege from './durchfuehrungswege.json';
import versorgungsausgleich from './versorgungsausgleich.json';
import mathematik from './mathematik.json';
import rechtsprechung from './rechtsprechung.json';

// Reihenfolge = Anzeige-Reihenfolge auf der Startseite
export const welten = [
  entgeltumwandlung,
  betravg,
  durchfuehrungswege,
  versorgungsausgleich,
  mathematik,
  rechtsprechung,
];

// Geplante Welten erscheinen ausgegraut als "Bald verfügbar"
export const geplanteWelten = [
  { icon: '📈', titel: 'Rentenanpassung' },
  { icon: '🕵️', titel: 'Mythen-Welt' },
];
