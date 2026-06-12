<script>
  import { createEventDispatcher } from 'svelte';
  import { fortschritt } from '../lib/fortschritt.js';

  export let welt;

  const dispatch = createEventDispatcher();
</script>

<button class="zurueck" on:click={() => dispatch('zurueck')}>← Zurück</button>

<h2>{welt.icon} {welt.titel}</h2>
<p class="leise">{welt.beschreibung}</p>

{#each welt.lektionen as lektion, i}
  {@const erledigt = $fortschritt.abgeschlosseneLektionen.includes(lektion.id)}
  {@const gesperrt =
    i > 0 && !$fortschritt.abgeschlosseneLektionen.includes(welt.lektionen[i - 1].id)}
  <div class="karte lektion-karte" class:gesperrt>
    <div>
      <strong>{erledigt ? '✅' : gesperrt ? '🔒' : `${i + 1}.`} {lektion.titel}</strong>
      <p class="leise">
        {gesperrt ? 'Schließe erst die Lektion davor ab' : `${lektion.fragen.length} Fragen`}
      </p>
    </div>
    {#if !gesperrt}
      <button class="schmal" on:click={() => dispatch('starteLektion', lektion)}>
        {erledigt ? 'Nochmal' : 'Start'}
      </button>
    {/if}
  </div>
{/each}

<style>
  .zurueck {
    width: auto;
    background: transparent;
    color: var(--farbe-primaer);
    padding: 6px 10px;
    margin-bottom: 4px;
  }
  .zurueck:hover {
    background: #e2e8f0;
  }
  h2 {
    margin: 8px 0 4px;
  }
  .lektion-karte {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .lektion-karte.gesperrt {
    opacity: 0.55;
  }
  .schmal {
    width: auto;
    padding: 10px 22px;
    flex-shrink: 0;
  }
</style>
