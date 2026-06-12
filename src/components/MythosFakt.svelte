<script>
  import { createEventDispatcher } from 'svelte';

  export let frage;

  const dispatch = createEventDispatcher();
  let wahl = null;

  function antworten(istFaktGewaehlt) {
    if (wahl !== null) return;
    wahl = istFaktGewaehlt;
    dispatch('beantwortet', { korrekt: istFaktGewaehlt === frage.istFakt });
  }
</script>

<div class="karte">
  <p class="leise">Mythos oder Fakt?</p>
  <p class="aussage">„{frage.aussage}"</p>
  <div class="knoepfe">
    <button
      class="mythos"
      class:richtig={wahl !== null && !frage.istFakt}
      class:gewaehlt-falsch={wahl === false && frage.istFakt}
      on:click={() => antworten(false)}
    >
      ❌ Mythos
    </button>
    <button
      class="fakt"
      class:richtig={wahl !== null && frage.istFakt}
      class:gewaehlt-falsch={wahl === true && !frage.istFakt}
      on:click={() => antworten(true)}
    >
      ✅ Fakt
    </button>
  </div>
</div>

<style>
  .aussage {
    font-weight: 600;
    font-size: 1.1rem;
    font-style: italic;
  }
  .knoepfe {
    display: flex;
    gap: 10px;
  }
  .mythos,
  .fakt {
    background: var(--farbe-hintergrund);
    color: var(--farbe-text);
  }
  .mythos:hover,
  .fakt:hover {
    background: #e2e8f0;
  }
  .richtig {
    background: var(--farbe-richtig) !important;
    color: white !important;
  }
  .gewaehlt-falsch {
    background: var(--farbe-falsch) !important;
    color: white !important;
  }
</style>
