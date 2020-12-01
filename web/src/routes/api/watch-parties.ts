const parties = [
	{
	  id: 1,
	  name: "COVIDPALOOZA",
	  members: [{ id: 1, name: "Andrew" }, { id: 2, name: "Mary" }],
	  shows: [
	    {
	      id: 1,
	      title: "Bambi",
	      show_type: "MOVIE",
	      state: "WATCH_LATER",
	      watch_later_on: Date.now(),
	    },
	    {
	      id: 2,
	      title: "Adventure Time",
	      show_type: "SERIES",
	      state: "RECOMMENDED",
	      recommender_id: 1
	    }
	  ]
	},
	{
	  id: 2,
	  name: "frisbee friends hangout",
	  members: [{ id: 1, name: "Andrew" }, { id: 51, name: "Johnathan" }, { id: 32, name: "Veronica" }],
	  shows: [
	    {
	      id: 3,
	      title: "Perfect Blue",
	      show_type: "MOVIE",
	      state: "WATCH_LATER",
	      watch_later_on: Date.now(),
	    },
	    {
	      id: 4,
	      title: "Adventure Time",
	      show_type: "SERIES",
	      state: "RECOMMENDED",
	      recommender_id: 1
	    }
	  ]
	},
	{
	  id: 3,
	  name: "Spooky sisters movie night",
	  members: [{ id: 1, name: "Hayley" }, { id: 21, name: "Nicki" }, { id: 23, name: "Kyra" }],
	  shows: [
	    {
	      id: 3,
	      title: "VHS",
	      show_type: "MOVIE",
	      state: "WATCH_LATER",
	      watch_later_on: Date.now(),
	    },
	    {
	      id: 4,
	      title: "Scary Movie 1",
	      show_type: "MOVIE",
	      state: "RECOMMENDED",
	      recommender_id: 21
	    },
	    {
	      id: 14,
	      title: "Scary Movie 2",
	      show_type: "MOVIE",
	      state: "RECOMMENDED",
	      recommender_id: 23
	    },
	    {
	      id: 54,
	      title: "The Hills have Eyes",
	      show_type: "MOVIE",
	      state: "RECOMMENDED",
	      recommender_id: 1
	    },
	  ]
	}
];

export async function getAllWatchParties() {
  return parties;
};

export async function getWatchParty(partyId) {
  return parties.find(party => party.id == partyId);;
};
