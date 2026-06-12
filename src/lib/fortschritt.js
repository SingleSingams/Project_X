import { writable } from 'svelte/store';

const SPEICHER_SCHLUESSEL = 'rentenheld-fortschritt';

function heuteAlsString() {
  return new Date().toISOString().slice(0, 10);
}

function laden() {
  const standard = {
    xp: 0,
    streak: 0,
    letzterTag: null,
    abgeschlosseneLektionen: [],
    dailyGespielt: null,
  };
  try {
    const roh = localStorage.getItem(SPEICHER_SCHLUESSEL);
    return roh ? { ...standard, ...JSON.parse(roh) } : standard;
  } catch {
    return standard;
  }
}

function erstelleFortschritt() {
  const { subscribe, update } = writable(laden());

  function speichern(wert) {
    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(wert));
    } catch {
      // Privater Modus o.ä. – Fortschritt gilt dann nur für die Sitzung
    }
    return wert;
  }

  return {
    subscribe,

    xpHinzufuegen(menge) {
      update((f) => speichern({ ...f, xp: f.xp + menge }));
    },

    // Streak zählt Kalendertage: gestern gespielt -> +1, Lücke -> zurück auf 1
    streakAktualisieren() {
      update((f) => {
        const heute = heuteAlsString();
        if (f.letzterTag === heute) return f;
        const gestern = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        const neuerStreak = f.letzterTag === gestern ? f.streak + 1 : 1;
        return speichern({ ...f, streak: neuerStreak, letzterTag: heute });
      });
    },

    lektionAbschliessen(lektionId) {
      update((f) => {
        if (f.abgeschlosseneLektionen.includes(lektionId)) return f;
        return speichern({
          ...f,
          abgeschlosseneLektionen: [...f.abgeschlosseneLektionen, lektionId],
        });
      });
    },

    dailyAbschliessen() {
      update((f) => speichern({ ...f, dailyGespielt: heuteAlsString() }));
    },
  };
}

export const fortschritt = erstelleFortschritt();
export { heuteAlsString };
