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


export async function getShow(showId): Show {
  return { title: 'Godzilla' }
}
