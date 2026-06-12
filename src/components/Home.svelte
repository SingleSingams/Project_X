<script>
  import { createEventDispatcher } from 'svelte';
  import { fortschritt, heuteAlsString } from '../lib/fortschritt.js';
  import { welten, geplanteWelten } from '../data/welten.js';

  const dispatch = createEventDispatcher();

  $: dailyHeuteGespielt = $fortschritt.dailyGespielt === heuteAlsString();

  function erledigteLektionen(welt) {
    return welt.lektionen.filter((l) =>
      $fortschritt.abgeschlosseneLektionen.includes(l.id)
    ).length;
  }
</script>

<header>
  <div>
    <h1>🦸 RentenHeld</h1>
    <p class="leise claim">Betriebliche Altersvorsorge verstehen – 3 Minuten am Tag.</p>
  </div>
  <div class="statistik">
    <span title="Erfahrungspunkte">⭐ {$fortschritt.xp}</span>
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

<h2>Themenwelten</h2>

<div class="welten-raster">
  {#each welten as welt}
    {@const erledigt = erledigteLektionen(welt)}
    {@const gesamt = welt.lektionen.length}
    <button class="welt-karte" on:click={() => dispatch('oeffneWelt', welt)}>
      <span class="welt-icon">{welt.icon}</span>
      <span class="welt-titel">{welt.titel}</span>
      <span class="leise">{erledigt}/{gesamt} Lektionen</span>
      <span class="mini-balken">
        <span
          class="mini-balken-fuellung"
          class:fertig={erledigt === gesamt}
          style="width: {gesamt ? (erledigt / gesamt) * 100 : 0}%"
        ></span>
      </span>
    </button>
  {/each}

  {#each geplanteWelten as welt}
    <div class="welt-karte geplant">
      <span class="welt-icon">{welt.icon}</span>
      <span class="welt-titel">{welt.titel}</span>
      <span class="leise">Bald verfügbar</span>
    </div>
  {/each}
</div>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }
  h1 {
    font-size: 1.4rem;
    margin: 0;
  }
  .claim {
    margin: 4px 0 0;
  }
  .statistik {
    display: flex;
    gap: 12px;
    font-weight: 600;
    white-space: nowrap;
    padding-top: 4px;
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
  h2 {
    font-size: 1.1rem;
    margin: 20px 0 10px;
  }
  .welten-raster {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .welt-karte {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    background: var(--farbe-karte);
    color: var(--farbe-text);
    border-radius: var(--radius);
    padding: 14px;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
    text-align: left;
  }
  .welt-karte:hover {
    background: #eef2ff;
  }
  .welt-karte.geplant {
    opacity: 0.5;
  }
  .welt-icon {
    font-size: 1.6rem;
  }
  .welt-titel {
    font-weight: 600;
    line-height: 1.2;
  }
  .mini-balken {
    width: 100%;
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
    margin-top: 4px;
  }
  .mini-balken-fuellung {
    display: block;
    height: 100%;
    background: var(--farbe-primaer);
    transition: width 0.3s;
  }
  .mini-balken-fuellung.fertig {
    background: var(--farbe-richtig);
  }
</style>
