<script>
  import { createEventDispatcher } from 'svelte';
  import Frage from './Frage.svelte';
  import { fortschritt, heuteAlsString } from '../lib/fortschritt.js';
  import { dailyFrage, shareText, teilen } from '../lib/daily.js';

  const dispatch = createEventDispatcher();
  const heute = heuteAlsString();
  const frage = dailyFrage(heute);

  let beantwortet = false;
  let korrekt = false;
  let teilStatus = null;

  function aufAntwort(event) {
    beantwortet = true;
    korrekt = event.detail.korrekt;
    if (korrekt) fortschritt.xpHinzufuegen(20);
    fortschritt.dailyAbschliessen();
    fortschritt.streakAktualisieren();
  }

  async function aufTeilen() {
    teilStatus = await teilen(shareText(heute, korrekt));
  }
</script>

<p class="leise">⚡ Daily Challenge · eine Frage, jeden Tag, für alle gleich</p>

<Frage {frage} on:beantwortet={aufAntwort} />

{#if beantwortet}
  <div class="karte erklaerung" class:richtig={korrekt} class:falsch={!korrekt}>
    <strong>{korrekt ? 'Richtig! +20 XP' : 'Leider daneben – morgen neue Chance!'}</strong>
    <p>{frage.erklaerung}</p>
  </div>
  <button on:click={aufTeilen}>📤 Ergebnis teilen</button>
  {#if teilStatus === 'kopiert'}
    <p class="leise mitte">In die Zwischenablage kopiert – ab damit in den Gruppenchat!</p>
  {/if}
  <button class="sekundaer" on:click={() => dispatch('fertig')}>Zur Übersicht</button>
{/if}

<style>
  .erklaerung {
    border-left: 5px solid;
  }
  .erklaerung.richtig {
    border-color: var(--farbe-richtig);
  }
  .erklaerung.falsch {
    border-color: var(--farbe-falsch);
  }
  .sekundaer {
    background: transparent;
    color: var(--farbe-primaer);
    margin-top: 8px;
  }
  .sekundaer:hover {
    background: #e2e8f0;
  }
  .mitte {
    text-align: center;
  }
</style>
