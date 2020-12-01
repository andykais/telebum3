<script>
  import { autoComplete } from '../routes/api/search.ts'
  let text;
  let input;
  let results       = [];
  let filteredItems = [];
  let currentIndex  = 0;

  async function onInput() {
    results = await autoComplete( text );

    // Potentially do some filtering here
    // Would be better if we could have an orderBy param
    // sent to the data API so that the server handles sorting.
    filteredItems = results;
  }

  function onFocus() {
    console.log( "onFocus" );
  }

  function onInputClick( item ) {
    text = item;
  }

  function onKeyDown( e ) {
    switch( e.key ) {
      case 'ArrowDown':
        if ( currentIndex < filteredItems.length - 1 ) {
          currentIndex++;
        }
        else {
          currentIndex = filteredItems.length - 1;
        }
        break;
      case 'ArrowUp':
        if ( currentIndex > filteredItems.length - 1 ) {
          currentIndex--;
        }
        else {
          currentIndex = 0;
        }
        break;
      case 'Enter':
        text = filteredItems[currentIndex];
    }
  }

  function doSearch() {
    console.log("doSearch")
  }
</script>

<input
  class       = "input autocomplete-input"
  bind:this   = {input}
  bind:value  = {text}
  on:input    = {onInput}
  on:keydown  = {onKeyDown}
  placeholder = "something"
>

<button on:click="{doSearch}">Search</button>

{#if filteredItems && filteredItems.length}
<div class="autocomplete-list" bind:this={results}>
  {#each filteredItems as item, i}
    <div class="{currentIndex == i ? 'selected' : ''} autocomplete-list-item">
      <a on:click="{() => { onInputClick( item ) }}">{item}</a>
    </div>
  {/each}
</div>
{/if}

<style>
  .selected {
    background-color: blue;
  }
</style>
