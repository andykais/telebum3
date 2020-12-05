import { fetch_binary, fetch_json } from './util'
import type { Context } from './index'

async function collect_movie(context: Context, id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${context.moviedb_api_key}&append_to_response=images,videos`
  const movie_data = await fetch_json(url)
  // const { inspect } = require('util')
  // console.log(inspect(movie_data, { depth: null, colors: true }))
  const row_data = {
    release_date: movie_data.release_date,
    themoviedb_id: movie_data.id,
    status: movie_data.status,
    overview: movie_data.overview,
    runtime: movie_data.runtime,
    title: movie_data.title,
    original_language: movie_data.original_language,
    spoken_languages: JSON.stringify(movie_data.original_languages),
    imdb_id: movie_data.imdb_id,
    genres: JSON.stringify(movie_data.genres),
    poster_path: movie_data.poster_path,
    additional_videos: JSON.stringify(movie_data.videos),
    additional_images: JSON.stringify(movie_data.images),
  }
  const { data, error } = await context.supabase.from('movie').insert([row_data])
  if (error)
    throw new Error(`SupabaseError: inserting into 'movies' table:\n ${JSON.stringify(error)}`)
  return data
}

export { collect_movie }
