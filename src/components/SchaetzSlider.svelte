<script>
  import { createEventDispatcher } from 'svelte';

  export let frage;

  const dispatch = createEventDispatcher();
  let wert = Math.round((frage.min + frage.max) / 2);
  let abgegeben = false;
  let korrekt = false;

  function abgeben() {
    if (abgegeben) return;
    abgegeben = true;
    korrekt = Math.abs(wert - frage.richtig) <= frage.toleranz;
    dispatch('beantwortet', { korrekt });
  }
</script>

<div class="karte">
  <p class="frage-text">{frage.frage}</p>
  <p class="wert" class:richtig={abgegeben && korrekt} class:falsch={abgegeben && !korrekt}>
    {wert} {frage.einheit}
  </p>
  <input
    type="range"
    min={frage.min}
    max={frage.max}
    bind:value={wert}
    disabled={abgegeben}
  />
  {#if abgegeben}
    <p class="aufloesung">
      Richtige Antwort: <strong>{frage.richtig} {frage.einheit}</strong>
      {#if frage.toleranz > 0}<span class="leise">(±{frage.toleranz} zählt)</span>{/if}
    </p>
  {:else}
    <button on:click={abgeben}>Schätzung abgeben</button>
  {/if}
</div>

<style>
  .frage-text {
    font-weight: 600;
    font-size: 1.05rem;
    margin-top: 0;
  }
  .wert {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin: 8px 0;
  }
  .wert.richtig {
    color: var(--farbe-richtig);
  }
  .wert.falsch {
    color: var(--farbe-falsch);
  }
  input[type='range'] {
    width: 100%;
    margin-bottom: 16px;
    accent-color: var(--farbe-primaer);
  }
  .aufloesung {
    text-align: center;
  }
</style>
