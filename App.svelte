<script>
  import { onMount } from "svelte";
  import Game from "./Game.svelte";

  let op = "s";
  let lim = 0;

  const json = localStorage.getItem("memGame");
  if (json) {
    try {
      const j = JSON.parse(json);
      op = j.op;
      lim = j.lim;
    } catch (e) {
      localStorage.clear();
    }
  }
</script>

<style>
  :root {
    --main-bg-color: #6a8caf;
    --card-bg-color: #75b79e;
    --card-border-color: black;
    --main-color: black;
    --main-select: #eef9bf;
  }

  :global(body) {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: var(--main-bg-color);
    color: var(--main-color);
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 760px;
    /* border: 2px dotted rgb(96, 139, 168); */
    top: -30px;
    position: fixed;
  }

  .box > div {
    align-self: stretch;
    padding: 20px;
  }

  .group {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 2em;
  }

  .disabled {
    cursor: not-allowed;
  }

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  label {
    position: relative;
    margin-right: 1em;
    padding-left: 2em;
    padding-right: 1em;
    line-height: 2;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 0.07em;
    font-size: 16px;
    user-select: none;
  }

  label:before {
    box-sizing: border-box;
    content: " ";
    position: absolute;
    top: 0.3em;
    left: 0;
    display: block;
    width: 1.4em;
    height: 1.4em;
    border: 2px solid var(--main-select);
    border-radius: 0.25em;
    z-index: -1;
  }

  input[type="radio"] + label::before {
    border-radius: 1em;
  }

  /* Checked */
  input[type="checkbox"]:checked + label,
  input[type="radio"]:checked + label {
    padding-left: 1em;
  }
  input[type="checkbox"]:checked + label:before,
  input[type="radio"]:checked + label:before {
    top: 0;
    width: 100%;
    height: 2em;
    background: var(--main-select);
  }

  /* Transition */
  label,
  label::before {
    -webkit-transition: 0.25s all ease;
    transition: 0.25s all ease;
  }
</style>

<section class="box">
  <div>
    <h1>Matematika pro 1. ročník</h1>
    <div class="group">
      <input type="radio" bind:group={op} value={'s'} name="op" id="opS" />
      <label for="opS">➕ Sčítání</label>
      <input class="disabled" type="radio" disabled bind:group={op} value={'o'} name="op" id="opO" />
      <label class="disabled" for="opO">➖ Odčítání</label>
      <input class="disabled" type="radio" disabled bind:group={op} value={'m'} name="op" id="opM" />
      <label class="disabled" for="opM">➕➖ Mix</label>
    </div>

    <div class="group">
      <input type="radio" bind:group={lim} value={0} name="lim" id="lim10" />
      <label for="lim10">do 10</label>
      <input type="radio" bind:group={lim} value={1} name="lim" id="lim20" />
      <label for="lim20">do 20</label>
      <input type="radio" bind:group={lim} value={2} name="lim" id="lim2010" />
      <label for="lim2010">do 20 bez přechodu</label>
    </div>
  </div>
  <Game limit={lim} operation={op} />
</section>

