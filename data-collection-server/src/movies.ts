import * as errors from './errors'
import { fetch_binary, fetch_json } from './util'
import type { Context } from './index'
import type { definitions as tables } from './types/supabase'

async function upsert_movie({ supabase, stats }: Context, movie_row_data: any) {
  const prev_res = await supabase
    .from<tables['movie']>('movie')
    .select()
    .eq('themoviedb_id', movie_row_data.themoviedb_id)
  if (prev_res.error) throw new errors.SupabaseError(prev_res.error)
  const insert = prev_res.data!.length === 0
  if (insert) {
    const res = await supabase.from<tables['movie']>('movie').insert([movie_row_data])
    if (res.error) throw new errors.SupabaseError(res.error, movie_row_data)
    stats.movies.created++
    return { insert, data: res.data! }
  } else {
    const res = await supabase
      .from<tables['movie']>('movie')
      .update(movie_row_data)
      .eq('themoviedb_id', movie_row_data.themoviedb_id)
    if (res.error) throw new errors.SupabaseError(res.error, movie_row_data)
    stats.movies.updated++
    return { insert, data: res.data! }
  }
}

async function collect_movie(context: Context, id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${context.moviedb_api_key}&append_to_response=images,videos`
  const movie_data = await fetch_json(url)
  const row_data = {
    release_date: movie_data.release_date ? movie_data.release_date : null,
    themoviedb_id: movie_data.id,
    status: movie_data.status,
    overview: movie_data.overview,
    runtime: movie_data.runtime,
    title: movie_data.title,
    original_title: movie_data.original_title,
    original_language: movie_data.original_language,
    spoken_languages: JSON.stringify(movie_data.original_languages),
    imdb_id: movie_data.imdb_id,
    genres: JSON.stringify(movie_data.genres),
    poster_path: movie_data.poster_path,
    additional_videos: JSON.stringify(movie_data.videos),
    additional_images: JSON.stringify(movie_data.images),
  }
  return await upsert_movie(context, row_data)
}

export { collect_movie }
