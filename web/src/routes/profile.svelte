<script>
  import { onMount } from 'svelte';
  import { getAllShows } from './api/profile.ts';

	const tabs = ['watching', 'unwatched', 'completed'];
	let tabOpen = 0;
	const defaultShows = {
			watching: [],
			unwatched: [],
			completed: []
	};
	let shows = { ...defaultShows	};

	function changeOpenTab(tabIndex) {
		tabOpen = tabIndex;
	}

	// given an array of shows, return an object of shows by category, split into 3 arrays
	function sortShowsIntoCategories(shows) {
		const categorizedShows = { ...defaultShows };

		for (let i = 0; i < shows.length; ++i) {
			const show = shows[i];

			categorizedShows[show.status].push(show);
		}

		return categorizedShows;
	};

	onMount(async () => {
		shows = sortShowsIntoCategories(await getAllShows());
	})
</script>

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

	h1 {
		margin-bottom: 2rem;
	}

	.wrapper {
	}

	.tabs {
		display: flex;
		justify-content: space-between;
	}

	.tabs .tab {
		padding: .5rem;
		text-transform: capitalize;
		cursor: pointer;
		flex: 1;
	}

	.tabs .tab.selected {
		background-color: #eeeeee;
		border-top-right-radius: 1rem;
		border-top-left-radius: 1rem;
	}

	.tabs .tab.completed a {
		color: green;
	}
	.tabs .tab.unwatched a {
		color: #888888;
	}
	.tabs .tab.watching a {
		color: orange;
	}

	.shows-list .show {
		background-color: #eeeeee;
		display: flex;
		align-items: center;
		margin-bottom: .5rem;
		padding: .25rem .5rem;
	}

	.friends-watching-list .friend {
		display: inline-block;
		font-size: .5rem;
		padding: .2rem;
		margin: 0 .1rem;
		background-color: lightblue;
		border: 2px orange solid;
		width: .5rem;
		height: .5rem;
		line-height: .5rem;
		border-radius: 1rem;
		text-align: center;
	}

	.friends-watching-list .friend.completed {
		border-color: green;
	}
</style>

<div class="wrapper">
	<h1>My shows</h1>

	<!-- tabs -->
	<div class="tabs">
		{ #each tabs as tab, i }
			<div class="tab { tab }" class:selected="{ i === tabOpen }">
				<a on:click={ () => changeOpenTab(i) }>{ tab }</a>
			</div>
		{ /each }
	</div>

	<!-- shows -->
	<ul class="shows-list">
		{ #each shows[tabs[tabOpen]] as show (show.id) }
			<li class="show">
				<h3>
					<a href="/show/{ show.id }">{ show.name }</a>
				</h3>
				<!-- friends who are watching or have already completed show -->
				<ul class="friends-watching-list">
					{ #each show.friends_watching as friend (friend.id) }
					<li 
						class="friend" 
						class:completed="{ friend.status === 'completed' }" 
						title="Friend { friend.id } { friend.status }"
					>
						{ friend.id }
					</li>
					{ /each }
				</ul>
			</li>
		{ /each }
	</ul>
</div>
