<script>
  import { onMount } from 'svelte'
  import { getAllShows } from './api/profile.ts'
	const tabs = ['Watching', 'Unwatched', 'Completed'];
	let shows = [];

	onMount(async () => {
		shows = await getAllShows();
	})
</script>


<h1>My shows</h1>

<div>
	<ul>
		{ #each shows as show (show.id) }
			<li>
				{ show.name }
			</li>
		{ /each }
	</ul>
	
</div>


<style>

</style>
