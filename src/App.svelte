<script>
  import Home from './components/Home.svelte';
  import Welt from './components/Welt.svelte';
  import Lektion from './components/Lektion.svelte';
  import DailyChallenge from './components/DailyChallenge.svelte';

  let ansicht = 'home';
  let aktiveWelt = null;
  let aktiveLektion = null;
</script>

{#if ansicht === 'home'}
  <Home
    on:oeffneWelt={(e) => {
      aktiveWelt = e.detail;
      ansicht = 'welt';
    }}
    on:starteDaily={() => (ansicht = 'daily')}
  />
{:else if ansicht === 'welt'}
  <Welt
    welt={aktiveWelt}
    on:starteLektion={(e) => {
      aktiveLektion = e.detail;
      ansicht = 'lektion';
    }}
    on:zurueck={() => (ansicht = 'home')}
  />
{:else if ansicht === 'lektion'}
  <Lektion lektion={aktiveLektion} on:fertig={() => (ansicht = 'welt')} />
{:else if ansicht === 'daily'}
  <DailyChallenge on:fertig={() => (ansicht = 'home')} />
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
