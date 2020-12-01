<script>
  import { autoComplete } from '../routes/api/search.ts'
  let text;
  let input;
  let results        = [];
  let filteredItems  = [];
  let currentIndex   = -1;
  let showSuggestions = 0;

  async function onInput() {
    results = await autoComplete( text );

    // Potentially do some filtering here
    // Would be better if we could have an orderBy param
    // sent to the data API so that the server handles sorting.
    filteredItems   = results;
    showSuggestions = 1;
  }

  function onInputClick( item ) {
    text         = item;
    currentIndex = filteredItems.findIndex(
      ( element ) => element == item
    );
    showSuggestions = 0;
  }

  function onKeyDown( e ) {
    switch( e.key ) {
      case 'ArrowDown':
        if ( currentIndex < filteredItems.length - 1 ) {
          currentIndex++;
          text = filteredItems[currentIndex];
        }
        else {
          currentIndex = filteredItems.length - 1;
        }
        showSuggestions = 1;
        break;
      case 'ArrowUp':
        if ( currentIndex > filteredItems.length - 1 ) {
          currentIndex--;
          text = filteredItems[currentIndex];
        }
        else {
          currentIndex = 0;
        }
        showSuggestions = 1;
        break;
      case 'Enter':
        showSuggestions = 0;
        text = filteredItems[currentIndex];
        break;
      default:
        break;
    }
  }
</script>

<style>
  .selected {
    background-color: blue;
  }
  .autocomplete {
    /*the container must be positioned relative:*/
    position: relative;
    display: inline-block;
  }
  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
  }
  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }
  .autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
  }
</style>

<div class="autocomplete">
  <input
    bind:this   = {input}
    bind:value  = {text}
    on:input    = {onInput}
    on:keydown  = {onKeyDown}
    placeholder = "..."
  >
  <a class="button" href="show/{text}">Search</a>

  {#if showSuggestions && filteredItems && filteredItems.length}
    <div class="autocomplete-items" bind:this={results}>
      {#each filteredItems as item, i}
        <div class="{currentIndex == i ? 'autocomplete-active' : ''}">
          <a on:click="{() => { onInputClick( item ) }}">{item}</a>
        </div>
      {/each}
    </div>
  {/if}
</div>
