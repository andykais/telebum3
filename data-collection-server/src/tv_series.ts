import * as errors from './errors'
import { fetch_binary, fetch_json } from './util'
import type { Context } from './index'
import type { definitions as tables } from './types/supabase'

// IMPORTANT NOTE: these 'upsert' commands are not atomic. This is intentional. We can perform atomic upserts
// with 'ON CONFLICT' clauses, but we cannot check if an update vs an insert was performed. These application
// level checks allow us to know that information, which is useful for logging.
// We are not worried about concurrency issues since there should only ever be one data collector running.

async function upsert_tv_series({ supabase, stats }: Context, tv_series_row_data: any) {
  const prev_res = await supabase
    .from<tables['tv_series']>('tv_series')
    .select()
    .eq('themoviedb_id', tv_series_row_data.themoviedb_id)
  if (prev_res.error) throw new errors.SupabaseError(prev_res.error)
  const insert = prev_res.data!.length === 0
  if (insert) {
    const res = await supabase.from<tables['tv_series']>('tv_series').insert([tv_series_row_data])
    if (res.error) throw new errors.SupabaseError(res.error)
    stats.tv_series.created++
    return { insert, data: res.data! }
  } else {
    const res = await supabase
      .from<tables['tv_series']>('tv_series')
      .update(tv_series_row_data)
      .eq('themoviedb_id', tv_series_row_data.themoviedb_id)
    if (res.error) throw new errors.SupabaseError(res.error)
    stats.tv_series.updated++
    return { insert, data: res.data! }
  }
}

async function upsert_tv_season({ supabase, stats }: Context, tv_season_row_data: any) {
  const prev_res = await supabase
    .from<tables['tv_season']>('tv_season')
    .select()
    .eq('tv_series_id', tv_season_row_data.tv_series_id)
    .eq('season_number', tv_season_row_data.season_number)
  if (prev_res.error) throw new errors.SupabaseError(prev_res.error)
  const insert = prev_res.data!.length === 0
  if (insert) {
    const res = await supabase.from<tables['tv_season']>('tv_season').insert([tv_season_row_data])
    if (res.error) throw new errors.SupabaseError(res.error)
    stats.tv_seasons.created++
    return { insert, data: res.data! }
  } else {
    const res = await supabase
      .from<tables['tv_season']>('tv_season')
      .update(tv_season_row_data)
      .eq('tv_series_id', tv_season_row_data.tv_series_id)
      .eq('season_number', tv_season_row_data.season_number)
    if (res.error) throw new errors.SupabaseError(res.error)
    stats.tv_seasons.updated++
    return { insert, data: res.data! }
  }
}

async function upsert_tv_episode({ supabase, stats }: Context, tv_episode_row_data: any) {
  const prev_res = await supabase
    .from<tables['tv_episode']>('tv_episode')
    .select()
    .eq('tv_series_id', tv_episode_row_data.tv_series_id)
    .eq('season_number', tv_episode_row_data.season_number)
    .eq('episode_number', tv_episode_row_data.episode_number)
  if (prev_res.error) throw new errors.SupabaseError(prev_res.error)
  const insert = prev_res.data!.length === 0
  if (insert) {
    const res = await supabase
      .from<tables['tv_episode']>('tv_episode')
      .insert([tv_episode_row_data])
    if (res.error) throw new errors.SupabaseError(res.error)
    stats.tv_episodes.created++
    return { insert, data: res.data! }
  } else {
    const res = await supabase
      .from<tables['tv_episode']>('tv_episode')
      .update(tv_episode_row_data)
      .eq('tv_series_id', tv_episode_row_data.tv_series_id)
      .eq('season_number', tv_episode_row_data.season_number)
      .eq('episode_number', tv_episode_row_data.episode_number)
    if (res.error) throw new errors.SupabaseError(res.error)
    stats.tv_episodes.updated++
    return { insert, data: res.data! }
  }
}

async function collect_tv_series(context: Context, id: string) {
  const { supabase, moviedb_api_key } = context
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${moviedb_api_key}&append_to_response=images,videos`
  const tv_series_data = await fetch_json(url)

  const tv_series_row_data = {
    title: tv_series_data.title || tv_series_data.original_name,
    original_language: tv_series_data.original_language,
    spoken_languages: JSON.stringify(tv_series_data.spoken_languages),
    imdb_id: tv_series_data.imdb_id,
    number_of_episodes: tv_series_data.number_of_episodes,
    number_of_seasons: tv_series_data.number_of_seasons,
    overview: tv_series_data.overview,
    poster_path: tv_series_data.poster_path,
    release_date: tv_series_data.release_date ? tv_series_data.release_date : null,
    series_type: tv_series_data.series_type,
    status: tv_series_data.status,
    tagline: tv_series_data.tagline,
    themoviedb_id: tv_series_data.id,
    genres: JSON.stringify(tv_series_data.genres),
    additional_videos: JSON.stringify(tv_series_data.videos),
    additional_images: JSON.stringify(tv_series_data.images),
  }

  const tv_series_row = await upsert_tv_series(context, tv_series_row_data)

  const tv_series_id = tv_series_row.data[0].id

  for (const season of tv_series_data.seasons) {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${moviedb_api_key}&append_to_response=images,videos`
    const tv_season_data = await fetch_json(url)
    const tv_season_row_data = {
      tv_series_id: tv_series_id,
      season_number: tv_season_data.season_number,
      air_date: tv_season_data.air_date,
      name: tv_season_data.name,
      overview: tv_season_data.overview,
      poster_path: tv_season_data.poster_path,
      additional_videos: JSON.stringify(tv_season_data.videos),
      additional_images: JSON.stringify(tv_season_data.images),
    }
    const tv_season_row = await upsert_tv_season(context, tv_season_row_data)

    for (const episode of tv_season_data.episodes) {
      const url = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}/episode/${episode.episode_number}?api_key=${moviedb_api_key}&append_to_response=images,videos`
      const tv_episode_data = await fetch_json(url)
      const tv_episode_row_data = {
        tv_series_id: tv_series_id,
        season_number: tv_season_data.season_number,
        episode_number: tv_episode_data.episode_number,
        air_date: tv_episode_data.air_date,
        name: tv_episode_data.name || tv_episode_data.original_name,
        overview: tv_episode_data.overview,
        additional_videos: JSON.stringify(tv_episode_data.videos),
        additional_images: JSON.stringify(tv_episode_data.images),
      }
      const tv_episode_row = await upsert_tv_episode(context, tv_episode_row_data)
    }
  }
}

export { collect_tv_series }
