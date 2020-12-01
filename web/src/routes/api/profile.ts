const mockShowsResponse = [
	{
		id: 1,
		show_type: "SERIES",
		name: "Run with the Wind",
		status: "watching",
		imdb_url: "https://www.imdb.com/title/tt9402026",
		friends_watching: [
			{
				id: 1,
				status: "watching"
			},
			{ 
				id: 2,
				status: "watching"
			},
			{ 
				id: 3,
				status: "completed"
			}
		],
		episodes: [
			{ 
				id: 1,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 2,
		 		completed: false
		 	},
			{ 
				id: 3,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 4,
		 		completed: false
		 	},
			{ 
				id: 5,
		 		completed: false
		 	},
			{ 
				id: 6,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 7,
		 		completed: true,
		 		completed_on: Date.now()
		 	}
		]
	},
	{
		id: 2,
		show_type: "SERIES",
		name: "The Crown",
		status: "watching",
		imdb_url: "https://www.imdb.com/title/tt4786824",
		friends_watching: [
			{
				id: 1,
				status: "watching"
			}
		],
		episodes: [
			{ 
				id: 1,
		 		completed: false,
		 	},
			{ 
				id: 2,
		 		completed: false
		 	},
			{ 
				id: 3,
		 		completed: false
		 	},
			{ 
				id: 4,
		 		completed: false
		 	},
			{ 
				id: 5,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 6,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 7,
		 		completed: true,
		 		completed_on: Date.now()
		 	}
		],
	},
	{
		id: 3,
		show_type: "MOVIE",
		name: "Perfect Blue",
		status: "completed",
		imdb_url: "https://www.imdb.com/title/tt0156887",
		friends_watching: [
			{
				id: 2,
				status: "watching"
			},
			{ 
				id: 3,
				status: "completed"
			}
		],
		episodes: [
			{ 
				id: 1,
		 		completed: true,
		 		completed_on: Date.now()
		 	}
		],
	},
	{
		id: 4,
		show_type: "SERIES",
		name: "Devilman Crybaby",
		status: "completed",
		imdb_url: "https://www.imdb.com/title/tt6660498",
		friends_watching: [
			{
				id: 3,
				status: "completed"
			}
		],
		episodes: [
			{ 
				id: 1,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 2,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 3,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 4,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 5,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 6,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 7,
		 		completed: true,
		 		completed_on: Date.now()
		 	}
		],
	},
	{
		id: 5,
		show_type: "SERIES",
		name: "Jimmy Neutron: Boy Genius",
		status: "unwatched",
		imdb_url: "https://www.imdb.com/title/tt0268397",
		friends_watching: [],
		episodes: [
			{ 
				id: 1,
		 		completed: false,
		 	},
			{ 
				id: 2,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 3,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 4,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 5,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 6,
		 		completed: true,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 7,
		 		completed: true,
		 		completed_on: Date.now()
		 	}
		],
	}
];

export async function getAllShows() {
  return mockShowsResponse;
}
