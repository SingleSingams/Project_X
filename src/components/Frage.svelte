<script>
  import MultipleChoice from './MultipleChoice.svelte';
  import MythosFakt from './MythosFakt.svelte';
  import SchaetzSlider from './SchaetzSlider.svelte';

  export let frage;

  const komponenten = {
    'multiple-choice': MultipleChoice,
    'mythos-fakt': MythosFakt,
    'schaetz-slider': SchaetzSlider,
  };
</script>

<svelte:component this={komponenten[frage.typ]} {frage} on:beantwortet />
