<script>
  import { formatCombinationSum } from "./stringUtil";
  import { generateSumSamples } from "./generator";
  import Gamecard from "./Gamecard.svelte";

  export let finish = false;
  export let limit = 10;
  export let operation = "s";

  const howManyCards = 20;
  const realLimits = [10, 20, 20];

  $: view = generateCards({ limit, operation });

  function generateCards({ limit, operation }) {
    finish = false;
    localStorage.setItem(
      "memGame",
      JSON.stringify({ lim: limit, op: operation })
    );

    let cards = new Array(howManyCards).fill(0);

    if (limit === 2) {
      cards = generateSumSamples({ size: 5, from: 1, to: 10 });
      cards = cards.concat(
        generateSumSamples({ size: 5, from: 10, to: 20, cross: false })
      );
    } else {
      cards = generateSumSamples({ size: 10, from: 1, to: realLimits[limit] });
    }

    return cards
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  let first;
  const selected = c => {
    view[c].selected = !view[c].selected;
    if (!first) {
      first = view[c];
    } else {
      if (
        first.value === view[c].value &&
        first !== view[c] &&
        first.text !== view[c].text
      ) {
        first.hasMatch = true;
        view[c].hasMatch = true;
        first = null;
        if (view.filter(card => !card.hasMatch).length === 0) {
          finish = true;
        }
      } else {
        setTimeout(() => {
          first.selected = false;
          view[c].selected = false;
          first = null;
        }, 333);
      }
    }
  };
</script>

<style>
  .game {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: 2px solid rgb(196, 224, 210);
    border-radius: 4px;
    box-shadow: 0 2px 1px 1px rgba(66, 66, 66, 0.78),
      0 1px 4px 2px rgba(66, 66, 66, 0.76);
  }

  .game_cards {
    background-image: url("https://picsum.photos/720/600");
    background-repeat: no-repeat;
    background-size: cover;
    width: 740px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 100px;
    grid-gap: 5px;
    /* padding: 5px; */
  }

  .game_cards_filter {
    position: relative;
  }

  .game_cards_filter::before {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);

    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

<div class="game">
    <section class="game_cards {finish === false ? 'game_cards_filter': ''}">
    {#each view as card, i}
      <Gamecard onSelect={() => selected(i)} text={card.text} selected={card.selected} hasMatch={card.hasMatch} />
    {/each}	
    </section>
</div>