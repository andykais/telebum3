<script>
  import { onMount } from 'svelte';
  import { getAllWatchParties } from './api/watch-parties';
  import { DateTime } from 'luxon';

  let parties = [];
  
  onMount(async () => {
    parties = await getAllWatchParties();
  })
</script>

<style>
  .parties {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .party-card {
    text-align: left;
    padding: 1rem;
    margin: .5rem .5rem;
    background-color: var(--primary-contrast);
    width: 100vw;
    box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.3);
  }

  .party-card .heading {
    text-align: left;
    font-weight: bold;
    margin-bottom: .5rem;
    border-bottom: 1px solid var(--secondary)
  }
  
  .party-card .content {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .party-card section {
    padding: .25rem;
    flex: 1;
  }

  .shows-list .show p {
    display: inline-block;
    width: 10rem;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>


<div class="watch-parties">
  <h1>My watch parties</h1>
  <button>Add party</button>

  <!-- parties -->
  <div class="parties">
    { #each parties as party (party.id) }
      <div class="party-card">
        <section class="heading">
          <h2>{ party.name }</h2>
        </section>
        <div class="content">
        <!-- members -->
          <section class="members">
            <h4>Members</h4>
            <ul class="members-list">
              { #each party.members as member (member.id) }
                <li class="member">
                  { member.name }
                </li>
              { /each }
            </ul>
          </section>
          <!-- shows -->
          <section class="shows">
            <h4>Shows</h4>
            <ul class="shows-list">
              { #each party.shows as show (show.id) }
                <li class="show">
                  <p>
                    { show.title }
                  </p>
                  {#if show.watch_later_on}
                    <p>
                      { new Date(show.watch_later_on).toLocaleString() }
                    </p>
                  {/if}
                </li>
              { /each }
            </ul>
          </section>
        </div>
      </div>
    { /each }
  </div>

</div>
