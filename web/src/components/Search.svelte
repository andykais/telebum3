<script>
  import { autoComplete } from '../routes/api/search.ts'
  let text;
  let input;
  let results       = [];
  let filteredItems = [];

  async function onInput() {
    results = await autoComplete( text );

    // Potentially do some filtering here
    // Would be better if we could have an orderBy param
    // sent to the data API so that the server handles sorting.
    filteredItems = results;
  }

  function onFocus() {
    console.log('onFocus')
  }

  function onKeyDown() {
    console.log('onKeyDown')
  }

  function onInputClick() {
    console.log('onInputClick')
  }

  function onKeyPress() {
    console.log('onKeyPress')
  }
</script>

<style>
</style>

<input
  class="input autocomplete-input"
  bind:this   = {input}
  bind:value  = {text}
  on:input    = {onInput}
  on:keydown  = {onKeyDown}
  on:click    = {onInputClick}
  on:keypress = {onKeyPress}
  placeholder = "something"
>
{#if filteredItems && filteredItems.length}
<div class="autocomplete-list" bind:this={results}>
  {#each filteredItems as item}
    <div class="autocomplete-list-item">
      {@html item}
    </div>
  {/each}
</div>
{/if}
