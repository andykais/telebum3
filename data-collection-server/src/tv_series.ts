import { fetch_binary, fetch_json } from './util'
import type { Context } from './index'

async function collect_tv_series(context: Context, id: string) {
  const { supabase, moviedb_api_key } = context
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${moviedb_api_key}&append_to_response=images,videos`
  const tv_series_data = await fetch_json(url)

  const tv_series_row_data = {
    title: tv_series_data.title || tv_series_data.original_name,
    original_language: tv_series_data.original_language,
    spoken_languages: JSON.stringify(tv_series_data.original_languages),
    imdb_id: tv_series_data.imdb_id,
    number_of_episodes: tv_series_data.number_of_episodes,
    number_of_seasons: tv_series_data.number_of_seasons,
    overview: tv_series_data.overview,
    poster_path: tv_series_data.poster_path,
    release_date: tv_series_data.release_date,
    series_type: tv_series_data.series_type,
    status: tv_series_data.status,
    tagline: tv_series_data.tagline,
    themoviedb_id: tv_series_data.themoviedb_id,
    genres: JSON.stringify(tv_series_data.genres),
    additional_videos: JSON.stringify(tv_series_data.videos),
    additional_images: JSON.stringify(tv_series_data.images),
  }
  const res_series = await supabase.from('tv_series').insert([tv_series_row_data])
  if (res_series.error) throw new Error(`query failed: \n${JSON.stringify(res_series.error)}`)
  if (res_series.data)
    throw new Error(
      `SupabaseError: row id not returned. Query:\n${JSON.stringify(tv_series_row_data)}`
    )

  for (const season of tv_series_data.seasons) {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${moviedb_api_key}&append_to_response=images,videos`
    const tv_season_data = await fetch_json(url)
    const tv_season_row_data = {
      tv_series_id: res_series.data![0].id,
      season_number: tv_series_data.season_number,
      air_date: tv_season_data.air_date,
      name: tv_season_data.name,
      overview: tv_season_data.overview,
      poster_path: tv_season_data.poster_path,
      additional_videos: JSON.stringify(tv_season_data.videos),
      additional_images: JSON.stringify(tv_season_data.images),
    }
    const res_season = await supabase.from('tv_season').insert([tv_season_row_data])
    if (res_season.error) throw new Error(`query failed: \n${JSON.stringify(res_season.error)}`)

    const tv_episode_rows_data = tv_season_data.episodes.map((row: any) => ({
      tv_series_id: res_series.data![0].id,
      season_number: tv_series_data.season_number,
      episode_number: row.episode_number,
      air_date: row.air_date,
      name: row.name,
      overview: row.overview,
    }))
    const res_episode = await supabase.from('tv_episode').insert(tv_episode_rows_data)
    if (res_series.data) throw new Error(`query failed: \n${JSON.stringify(res_episode.error)}`)
  }
}

export { collect_tv_series }
