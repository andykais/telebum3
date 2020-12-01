interface Series {
  type: 'series'
  id: number
  title: string
  release_date: Date
  description: string
  box_art_url: string
  imdb_url: string
  _user_added: boolean
  episodes: {
    id: number
    title: string
    season_title: string
    description: string
    release_date: Date
    _user_state: 'WATCHED' | 'UNWATCHED'
    _user_favorite: boolean
    _user_watched_on: Date
  }[]
}

interface Movie {
  type: 'movie'
  id: number
  title: string
  release_date: Date
  description: string
  box_art_url: string
  imdb_url: string
  _user_added: boolean
}

type Show = Series | Movie


const mockShowResponse: Series = {
  id: 1,
  type: "series",
  title: "Telebum: The series",
  release_date: new Date(),
  box_art_url: 'https://source.unsplash.com/random',
  description: 'Some how, people gather together to make a web app with some new tech n stuff. Yup!',
  imdb_url: "https://www.imdb.com/title/tt9402026",
  _user_added: false,
  episodes: [
    { 
      id: 1,
      title: 'Joe was here',
      season_title: 'Attach of Svelte',
      description: 'Joe writes code or somethings... idk',
      release_date: new Date(),
      _user_state: 'WATCHED',
      _user_favorite: false,
      _user_watched_on: new Date()
    },
    { 
      id: 2,
      title: 'Kaiser was here',
      season_title: 'Attach of Svelte',
      description: 'Kaiser writes code or somethings... idk',
      release_date: new Date(),
      _user_state: 'WATCHED',
      _user_favorite: false,
      _user_watched_on: new Date()
    },
    { 
      id: 3,
      title: 'Hayley was here',
      season_title: 'Attach of Svelte',
      description: 'Hayley writes code or somethings... idk',
      release_date: new Date(),
      _user_state: 'WATCHED',
      _user_favorite: false,
      _user_watched_on: new Date()
    },
    { 
      id: 4,
      title: 'Knation was here',
      season_title: 'Attach of Svelte',
      description: 'Knation writes code or somethings... idk',
      release_date: new Date(),
      _user_state: 'WATCHED',
      _user_favorite: false,
      _user_watched_on: new Date()
    }
  ]
}

export async function getShow(showId): Promise<Show> {
  return mockShowResponse
}


