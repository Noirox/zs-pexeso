<script>
  export let selected;
  export let hasMatch = false;
  export let onSelect = null;
  export let text = null;

  const initial = selected;

  const onClick = e => {
    onSelect(selected);
  };
</script>

<style>
  .game_card {
    position: relative;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.562);
    -webkit-perspective: 700px;
    perspective: 700px;
  }

  .game_card:hover {
    transition: 0.333s;
    scale: 0.93;
  }

  .game_card_cover.flipped {
    transition: 0.3s;
    background-color: var(--main-select);
  }

  .game_card_cover.match {
    transition: 1s;
    opacity: 0;
    box-shadow: none;
    pointer-events: none;
    cursor: arrow;
  }

  .game_card_cover {
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--card-border-color);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: var(--card-bg-color);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform 400ms;
    transition: -webkit-transform 400ms;
    transition: transform 400ms;
    transition: transform 400ms, -webkit-transform 400ms;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* N */
  }

  .game_card_cover {
    z-index: 1;
  }
</style>

<div class="game_card js-card">
  <div on:click={onClick} class="game_card_cover" class:flipped={selected} class:match={hasMatch}>
  <h2>{text || ''}</h2>
	</div>
</div>