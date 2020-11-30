<script>
  import { onMount } from 'svelte'
  import { getShow } from '../api/shows'
  let show = null
  // Note that we are stuck with client side fetches for the moment. SSR will be soon to come!
  onMount(async () => {
    const urlParts = location.pathname.split('/')
    const showId = urlParts[urlParts.length - 1]
    show = await getShow(showId)
    console.log({ show })
  })
</script>

Show: {show?.title}
