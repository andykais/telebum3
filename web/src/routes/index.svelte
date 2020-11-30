<script context="module">
  export async function preload() {
    const response = await this.fetch('/data/shows/latest')
    const data = await response.json()
    return { data }
  }
</script>

<script>
  import Counter from '$components/Counter.svelte'
  import Search from '$components/Search.svelte';
  import { DateTime } from 'luxon'
  import { x } from '../client/util'

  const tomorrow = DateTime.local().plus({ days: 1 })

  export let data
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>

<h1>Hello world!</h1>

<Search />

<h2>Latest Shows:</h2>
<ul>
  {#each data as show}
    <li>{show.title}</li>
  {/each}
</ul>

<div>
  A value from src/client/util:
  <strong>x: {x}</strong>
</div>

<Counter />
<p>
  Visit the
  <a href="https://svelte.dev">svelte.dev</a>
  to learn how to build Svelte apps.
</p>

<div>
  This is a date created using luxon (a npm module):
  <strong>tomorrow is {tomorrow.toFormat('MM/dd/yyyy')}</strong>
</div>
