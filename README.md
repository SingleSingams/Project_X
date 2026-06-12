# 🦸 RentenHeld

Eine Quiz-App im Duolingo-Stil, die betriebliche Altersvorsorge (bAV) endlich
verständlich macht – spielerisch, ehrlich und ohne ein einziges
personenbezogenes Datum. Das Konzept dahinter steht in [KONZEPT.md](KONZEPT.md).

## Starten

```bash
npm install
npm run dev      # Entwicklung auf http://localhost:5173
npm run build    # Produktions-Build nach dist/
npm run smoke    # Klickt die App automatisch durch (jsdom, kein Browser nötig)
```

## Wie Inhalte gepflegt werden

Der gesamte Content liegt in `src/data/*.json` – eine Datei pro Themen-Welt.
Neue Fragen schreiben heißt: JSON ergänzen, fertig. Es gibt drei Fragetypen:

| `typ` | Felder |
|---|---|
| `multiple-choice` | `frage`, `antworten[]`, `richtig` (Index), `erklaerung` |
| `mythos-fakt` | `aussage`, `istFakt` (bool), `erklaerung` |
| `schaetz-slider` | `frage`, `min`, `max`, `einheit`, `richtig`, `toleranz`, `erklaerung` |

Die **Daily Challenge** wird deterministisch aus dem Datum berechnet
(`src/lib/daily.js`) – alle Spieler sehen am selben Tag dieselbe Frage,
ganz ohne Server.

Fortschritt (XP, Streak, abgeschlossene Lektionen) liegt nur im
`localStorage` des Browsers (`src/lib/fortschritt.js`). Kein Account,
kein Backend, keine Datenschutz-Baustelle.

## ⚠️ Fachlicher Review nötig

Die Beispiel-Fragen in `src/data/entgeltumwandlung.json` sind ein
Startpunkt. Vor jeder Veröffentlichung gilt:

- Zahlen und Grenzen (Freibeträge, BBG-Prozentsätze, Zuschuss-Regeln)
  gegen den aktuellen Rechtsstand prüfen – sie ändern sich jährlich.
- Pro Frage intern eine Quelle notieren, damit der Jahres-Review schnell geht.
- Disclaimer („keine Rechts-/Steuerberatung") bleibt immer sichtbar.

## Deployment

Ein GitHub-Actions-Workflow (`.github/workflows/deploy.yml`) baut die App und
veröffentlicht sie auf GitHub Pages – bei jedem Push auf `main`, inklusive
Smoke-Test als Wächter. Pages wird beim ersten Workflow-Lauf automatisch
aktiviert; die App erscheint dann unter
`https://singlesingams.github.io/Project_X/`.

## Nächste Schritte (siehe KONZEPT.md)

- [x] Welt „Entgeltumwandlung" auf 5 Lektionen ausbauen (25 Fragen)
- [x] Lektionen schalten sich nacheinander frei
- [x] Deploy-Workflow für GitHub Pages
- [ ] Fragen fachlich reviewen und mit Kollegen testen (Woche 1!)
- [ ] Nach dem Merge: ersten Deploy abwarten, Share-Link live testen
- [ ] Zweite Welt („Grundlagen" oder „Mythen-Welt") anlegen
