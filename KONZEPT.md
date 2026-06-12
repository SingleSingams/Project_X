# Projekt: Gamifizierte bAV-Lern-App (Arbeitstitel: „RentenHeld")

## Die Idee in einem Satz

Eine Quiz-/Lern-App im Duolingo-Stil, die Arbeitnehmern in kurzen, spielerischen
Einheiten erklärt, wie betriebliche Altersvorsorge funktioniert und was sie ihnen
wirklich bringt.

## Warum diese Idee zu mir passt

- Ich kann Spielmechaniken bauen (IQ Path, 2.5D-Experimente).
- Ich habe bAV-Domänenwissen, das 99 % der Entwickler nicht haben.
- Zielgruppe ist erreichbar: Kollegen, HR-Kontakte, jeder Arbeitnehmer.
- **Kein Datenschutzproblem**: Die App braucht null personenbezogene Daten und
  keine Arbeitsdaten. Der Inhalt ist öffentliches Fach- und Gesetzeswissen.

## Zielgruppe

Arbeitnehmer 25–45, die eine bAV angeboten bekommen (oder schon haben) und sie
nicht verstehen. Sekundär: HR-Mitarbeiter und Azubis in der Versicherungsbranche.

## Kernmechaniken (vom Spiel gelernt)

| Mechanik | Zweck |
|---|---|
| Kurze Lektionen (2–3 Min, 5–8 Fragen) | Niedrige Einstiegshürde, Pendler-tauglich |
| Streak + XP + Level | Wiederkommen belohnen |
| **Daily Challenge mit Share-Schnipsel** | Eingebaute Verbreitung (Wordle-Prinzip) – löst das „keiner probiert es"-Problem |
| Erklärung nach jeder Antwort | Der eigentliche Lerneffekt steckt im „Warum" |

### Fragetypen für den MVP (3 reichen)

1. **Multiple Choice** – klassisch, mit Erklärung danach.
2. **Mythos oder Fakt?** – Swipe links/rechts. Perfekt für bAV, weil das Feld
   voller Halbwissen ist („bAV lohnt sich nie", „der Arbeitgeber zahlt alles").
3. **Schätz-Slider** – „Wie viel Netto kostet dich 100 € Entgeltumwandlung?"
   Aha-Momente durch überraschende Zahlen.

## Themen-Welten (Content-Plan)

1. **Grundlagen** – Was ist bAV überhaupt? Die drei Säulen.
2. **Entgeltumwandlung** – Brutto/Netto-Effekt, Arbeitgeberzuschuss (15 %, BRSG).
3. **Durchführungswege** – Direktversicherung, Pensionskasse, Pensionsfonds, …
4. **Steuern & Sozialversicherung** – Förderung heute, Besteuerung im Alter, KV-Beiträge auf Betriebsrenten, Freibetrag.
5. **Der Haken** – GRV-Abschlag durch geringere Beiträge, Kosten, Wechsel des Arbeitgebers (Portabilität).
6. **Mythen-Welt** – Bonus-Level nur mit Mythos-oder-Fakt-Fragen.

> Wichtig: Ehrlich bleiben, auch die Nachteile zeigen (Welt 5). Das schafft
> Vertrauen und unterscheidet die App von Vertriebs-Material.

## MVP-Umfang (Ziel: 4–6 Wochen Feierabend-Tempo)

**Drin:**
- 1 Welt komplett: „Entgeltumwandlung" mit ~30 Fragen in 5 Lektionen
- 3 Fragetypen (siehe oben)
- Streak, XP, Fortschrittsanzeige – alles lokal gespeichert (localStorage)
- Daily Challenge (1 Frage/Tag, gleiche für alle) mit teilbarem Emoji-Ergebnis
- Disclaimer: „Keine Rechts- oder Steuerberatung"

**Bewusst NICHT drin (Versuchung widerstehen):**
- Accounts / Login / Backend
- KI-Anbindung
- Mehrere Welten
- Native App / App-Store-Release

## Tech-Stack-Empfehlung

**Web-App (PWA) zuerst, nicht App Store.** Begründung: Ein Link in WhatsApp
ist eine 1-Sekunden-Hürde, eine App-Installation eine 1-Minuten-Hürde – und
genau an dieser Hürde sind die bisherigen Projekte gescheitert.

- Frontend: Svelte oder React + Vite (oder Flutter Web, falls vertrauter)
- Fragen als statische JSON-Dateien im Repo – Content ist Code
- Hosting: GitHub Pages / Netlify / Vercel (kostenlos, kein Server)
- Daily Challenge: deterministisch aus dem Datum berechnet → kein Backend nötig

## Woche 1 – ohne eine Zeile Code

1. **20 Fragen schreiben** (JSON oder Tabelle): Frage, Antworten, richtige
   Antwort, Erklärung in 2 Sätzen. Das ist der harte Teil, nicht der Code.
2. **3–5 Kollegen die Fragen roh vorlegen** (Messenger reicht): Welche Frage
   erzeugt ein „echt jetzt?!" – das sind die Gold-Fragen.
3. Erst wenn die Fragen funktionieren: Projekt aufsetzen.

## Verbreitungsplan (ab Tag 1 mitdenken)

- Kollegen & HR-Kontakte als erste Tester (die Zielgruppe sitzt im Nachbarbüro)
- LinkedIn-Post („Ich habe eine App gebaut, die bAV endlich verständlich macht")
- r/Finanzen, Finanztip-Community – dort wird ständig nach bAV gefragt
- Die Daily Challenge teilt sich im Idealfall selbst

## Risiken & Gegenmittel

| Risiko | Gegenmittel |
|---|---|
| Fachliche Fehler (Gesetze ändern sich) | Quellenangabe pro Frage intern pflegen, jährlicher Review, Disclaimer |
| Content-Erstellung wird zäh | Klein anfangen (1 Welt), Fragen-Schreiben als festen Wochentermin |
| Wieder „interessiert niemanden" | Woche-1-Test mit Kollegen VOR dem Bauen; Share-Mechanik von Anfang an |
| Scope-Explosion | MVP-Liste oben ist Vertrag mit mir selbst |
