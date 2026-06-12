<script>
  import { createEventDispatcher } from 'svelte';
  import { fortschritt, heuteAlsString } from '../lib/fortschritt.js';

  export let welt;

  const dispatch = createEventDispatcher();

  $: dailyHeuteGespielt = $fortschritt.dailyGespielt === heuteAlsString();
</script>

<header>
  <h1>🦸 RentenHeld</h1>
  <div class="statistik">
    <span title="Erfahrungspunkte">⭐ {$fortschritt.xp} XP</span>
    <span title="Tage-Serie">🔥 {$fortschritt.streak} Tage</span>
  </div>
</header>

<div class="karte daily" class:erledigt={dailyHeuteGespielt}>
  <div>
    <strong>⚡ Daily Challenge</strong>
    <p class="leise">
      {dailyHeuteGespielt
        ? 'Heute schon gemeistert – morgen gibt es eine neue Frage!'
        : 'Eine Frage pro Tag. Alle bekommen dieselbe – wer löst sie?'}
    </p>
  </div>
  {#if !dailyHeuteGespielt}
    <button on:click={() => dispatch('starteDaily')}>Spielen</button>
  {/if}
</div>

<h2>{welt.titel}</h2>
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
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  h1 {
    font-size: 1.4rem;
    margin: 0;
  }
  .statistik {
    display: flex;
    gap: 12px;
    font-weight: 600;
  }
  .daily {
    border: 2px solid var(--farbe-primaer);
  }
  .daily.erledigt {
    border-color: var(--farbe-richtig);
  }
  .daily button {
    margin-top: 10px;
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
