<script>
  import { onMount } from 'svelte'
  import { getShow } from '../api/shows'
  let show = null
  // Note that we are stuck with client side fetches for the moment. SSR will be soon to come!
  onMount(async () => {
    const urlParts = location.pathname.split('/')
    const showId = urlParts[urlParts.length - 1]
    show = await getShow(showId)
  })
</script>

<div class="header">
  <img class="boxArt" src={show?.box_art_url} alt={show?.title || 'Show'}/>
  <div class="headerContent">
    <h3>{show?.title}</h3>
    <p>{show?.description}</p>
    <div class="links">
      <a href={show?.imdb_url}>IMDB</a>
    </div>
  </div>
</div>
<div class="showContainer">
  <h4>Episodes</h4>
  <div class="episodeContainer">
    { #each show?.episodes ?? [] as episode (episode.id) }
      <div class='episode'>
        <div>{episode.title}</div>
        <div>starIcon: {episode._user_favorite}</div>
      </div>
    { /each }
  </div>
</div>

<style>
  .header {
    max-width: var(--max-width);
    margin: 24px auto;
    display: inline-flex;
    width: 100%;
    height: 400px;
  }

  .boxArt {
    border-radius: 4px;
    max-width: 400px;
    height: 100%;
    flex: 1;
  }

  .headerContent {
    padding: 0px 16px;
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .headerContent h3 {
    margin-bottom: 16px;
  }

  .headerContent .links {
    margin: auto 0 0;
    display: inline-flex;
  }

  .showContainer {
    max-width: var(--max-width);
    margin-top: 16px;
    text-align: left;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }

  .episodeContainer {
    margin-top: 16px;
    display: inline-flex;
    flex-direction: column;
  }

  .episode {
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
</style>