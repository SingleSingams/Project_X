<script>
  import { createEventDispatcher } from 'svelte';

  export let frage;

  const dispatch = createEventDispatcher();
  let gewaehlt = null;

  function antworten(index) {
    if (gewaehlt !== null) return;
    gewaehlt = index;
    dispatch('beantwortet', { korrekt: index === frage.richtig });
  }
</script>

<div class="karte">
  <p class="frage-text">{frage.frage}</p>
  {#each frage.antworten as antwort, i}
    <button
      class="antwort"
      class:richtig={gewaehlt !== null && i === frage.richtig}
      class:falsch={gewaehlt === i && i !== frage.richtig}
      disabled={gewaehlt !== null && gewaehlt !== i && i !== frage.richtig}
      on:click={() => antworten(i)}
    >
      {antwort}
    </button>
  {/each}
</div>

<style>
  .frage-text {
    font-weight: 600;
    font-size: 1.05rem;
    margin-top: 0;
  }
  .antwort {
    background: var(--farbe-hintergrund);
    color: var(--farbe-text);
    text-align: left;
    margin-bottom: 8px;
  }
  .antwort:hover {
    background: #e2e8f0;
  }
  .antwort.richtig {
    background: var(--farbe-richtig);
    color: white;
  }
  .antwort.falsch {
    background: var(--farbe-falsch);
    color: white;
  }
</style>
