<script>
  import { createEventDispatcher } from 'svelte';
  import Frage from './Frage.svelte';
  import { fortschritt } from '../lib/fortschritt.js';

  export let lektion;

  const XP_PRO_RICHTIGER_ANTWORT = 10;
  const dispatch = createEventDispatcher();

  let index = 0;
  let beantwortet = false;
  let letzteKorrekt = false;
  let richtigeAnzahl = 0;
  let fertig = false;

  $: aktuelleFrage = lektion.fragen[index];

  function aufAntwort(event) {
    beantwortet = true;
    letzteKorrekt = event.detail.korrekt;
    if (letzteKorrekt) {
      richtigeAnzahl += 1;
      fortschritt.xpHinzufuegen(XP_PRO_RICHTIGER_ANTWORT);
    }
  }

  function weiter() {
    if (index + 1 < lektion.fragen.length) {
      index += 1;
      beantwortet = false;
    } else {
      fertig = true;
      fortschritt.lektionAbschliessen(lektion.id);
      fortschritt.streakAktualisieren();
    }
  }
</script>

{#if !fertig}
  <p class="leise">
    {lektion.titel} · Frage {index + 1} von {lektion.fragen.length}
  </p>
  <div class="balken">
    <div class="balken-fuellung" style="width: {(index / lektion.fragen.length) * 100}%"></div>
  </div>

  {#key index}
    <Frage frage={aktuelleFrage} on:beantwortet={aufAntwort} />
  {/key}

  {#if beantwortet}
    <div class="karte erklaerung" class:richtig={letzteKorrekt} class:falsch={!letzteKorrekt}>
      <strong>{letzteKorrekt ? 'Richtig! +10 XP' : 'Leider daneben.'}</strong>
      <p>{aktuelleFrage.erklaerung}</p>
    </div>
    <button on:click={weiter}>
      {index + 1 < lektion.fragen.length ? 'Weiter' : 'Lektion abschließen'}
    </button>
  {/if}
{:else}
  <div class="karte abschluss">
    <h2>Lektion geschafft! 🎉</h2>
    <p>
      <strong>{richtigeAnzahl} von {lektion.fragen.length}</strong> richtig ·
      <strong>+{richtigeAnzahl * XP_PRO_RICHTIGER_ANTWORT} XP</strong>
    </p>
    <button on:click={() => dispatch('fertig')}>Zur Übersicht</button>
  </div>
{/if}

<style>
  .balken {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  .balken-fuellung {
    height: 100%;
    background: var(--farbe-primaer);
    transition: width 0.3s;
  }
  .erklaerung {
    border-left: 5px solid;
  }
  .erklaerung.richtig {
    border-color: var(--farbe-richtig);
  }
  .erklaerung.falsch {
    border-color: var(--farbe-falsch);
  }
  .abschluss {
    text-align: center;
  }
</style>
