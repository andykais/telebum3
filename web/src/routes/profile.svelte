<script>
  import { onMount } from 'svelte';
  import { getAllShows } from './api/profile.ts';

	const tabs = ['watching', 'unwatched', 'completed'];
	let tabOpen = 0;

	function changeOpenTab(tabIndex) {
		tabOpen = tabIndex;
	}

	// given an array of shows, return an object of shows by category, split into 3 arrays
	function sortShowsIntoCategories(shows) {
		console.log({ shows} );

		const categorizedShows = {
			watching: [],
			unwatched: [],
			completed: []
		};

		for (let i = 0; i < shows.length; ++i) {
			const show = shows[i];

			categorizedShows[show.status].push(show);
		}

		return categorizedShows;
	};

	let shows = {
			watching: [],
			unwatched: [],
			completed: []
	};
	
	onMount(async () => {
		shows = sortShowsIntoCategories(await getAllShows());
	})
</script>

<h1>My shows</h1>

<!-- tabs -->
<p>tab open: { tabOpen }</p>
<div>
	{ #each tabs as tab, i }
		<a on:click={ () => changeOpenTab(i) }>{ tab }</a>
	{ /each }
</div>

<!-- shows -->
<div>
	<ul class="shows-list">
		{ #each shows[tabs[tabOpen]] as show (show.id) }
			<li class="show">
				<h3><a href="/show/{ show.id }">{ show.name }</a></h3>
				<!-- friends who are watching or have already completed show -->
				<ul class="friends-watching-list">
					{ #each show.friends_watching as friend (friend.id) }
					<li class="friend" class:completed="{ friend.status === 'completed' }">
						{ friend.id }
					</li>
					{ /each }
				</ul>
			</li>
		{ /each }
	</ul>
	
</div>


<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	a {
		color: blue;
		text-decoration: none;
	}

	a:hover {
		color: darkblue;
	}

	.shows-list .show {
		background-color: #eeeeee;
		display: flex;
		align-items: baseline;
		margin: .5rem 0;
		padding: 0 .5rem;
	}

	.friends-watching-list .friend {
		display: inline-block;
		padding: .5rem;
		margin: 0 .15rem;
		background-color: lightblue;
		border: 2px orange solid;
		width: 1rem;
		height: 1rem;
		border-radius: 3rem;
		text-align: center;
	}

	.friends-watching-list .friend.completed {
		border-color: green;
	}
</style>
