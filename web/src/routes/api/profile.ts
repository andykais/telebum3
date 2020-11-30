const mockShowsResponse = [
	{
		id: 1,
		type: "show",
		name: "Run with the Wind",
		imdb_url: 'https://www.imdb.com/title/tt9402026',
		friends_watching: [
			{
				id: 1,
				completed: true
			},
			{ 
				id: 2,
				completed: false
			}
		],
		episodes: [
			{ 
				id: 1,
		 		completed: true
		 	},
			{ 
				id: 2,
		 		completed: false
		 	},
			{ 
				id: 3,
		 		completed: true
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
		 		completed: true
		 	},
			{ 
				id: 7,
		 		completed: true
		 	}
		]
	},
	{
		id: 2,
		type: "show",
		name: "The Crown",
		imdb_url: 'https://www.imdb.com/title/tt4786824',
		friends_watching: [
			{
				id: 1,
				completed: false
			}
		],
		episodes: [
			{ 
				id: 1,
		 		completed: false,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 2,
		 		completed: false,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 3,
		 		completed: false,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 4,
		 		completed: false,
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
		id: 3,
		type: "movie",
		name: "Perfect Blue",
		episode_count: 1,
		episodes_completed: 1,
		imdb_url: 'https://www.imdb.com/title/tt0156887',
		friends_watching: [
			{
				id: 1,
				completed: false
			},
			{ 
				id: 2,
				completed: false
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
		 		completed: false,
		 		completed_on: Date.now()
		 	},
			{ 
				id: 5,
		 		completed: false,
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
