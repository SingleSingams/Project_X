<script>
  import Home from './components/Home.svelte';
  import Lektion from './components/Lektion.svelte';
  import DailyChallenge from './components/DailyChallenge.svelte';
  import welt from './data/entgeltumwandlung.json';

  let ansicht = 'home';
  let aktiveLektion = null;

  function zurueck() {
    ansicht = 'home';
    aktiveLektion = null;
  }
</script>

{#if ansicht === 'home'}
  <Home
    {welt}
    on:starteLektion={(e) => {
      aktiveLektion = e.detail;
      ansicht = 'lektion';
    }}
    on:starteDaily={() => (ansicht = 'daily')}
  />
{:else if ansicht === 'lektion'}
  <Lektion lektion={aktiveLektion} on:fertig={zurueck} />
{:else if ansicht === 'daily'}
  <DailyChallenge on:fertig={zurueck} />
{/if}

<footer class="leise">
  RentenHeld erklärt Zusammenhänge, ersetzt aber keine Rechts- oder
  Steuerberatung. Zahlen und Grenzen ändern sich jährlich – Stand bitte prüfen.
</footer>

<style>
  footer {
    margin-top: 32px;
    text-align: center;
    font-size: 0.75rem;
  }
</style>
