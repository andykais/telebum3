import { fetch_binary } from './util'
import { collect_movie } from './movies'
import { collect_tv_series } from './tv_series'
import * as logs from './data_collection_logs'
import type { Context } from './index'

function format_date_for_urls() {
  const todays_date = new Date()
  return `${todays_date
    .getMonth()
    .toString()
    .padStart(2, '0')}_${todays_date
    .getDay()
    .toString()
    .padStart(2, '0')}_${todays_date.getFullYear()}`
}
async function collect_all_movies(context: Context) {
  const todays_date_formatted = format_date_for_urls()
  const url = `http://files.tmdb.org/p/exports/movie_ids_${todays_date_formatted}.json.gz`

  const movie_ids_str = await fetch_binary(url)
  const movie_ids = movie_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))

  console.log(`themoviedb currently has ${movie_ids.length} movies`)
  context.stats.total_movies_queued = movie_ids.length
  await logs.update_progress(context)
  for (const i of movie_ids.keys()) {
    const { id } = movie_ids[i]
    await collect_movie(context, id)
    await logs.update_progress(context)
  }
}

async function collect_all_tv_series(context: Context) {
  const todays_date_formatted = format_date_for_urls()
  const url = `http://files.tmdb.org/p/exports/tv_series_ids_${todays_date_formatted}.json.gz`

  const tv_series_ids_str = await fetch_binary(url)
  const tv_series_ids = tv_series_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))

  console.log(`themoviedb currently has ${tv_series_ids.length} tv series`)
  context.stats.total_tv_series_queued = tv_series_ids.length
  for (const i of tv_series_ids.keys()) {
    const { id } = tv_series_ids[i]
    await collect_tv_series(context, id)
    await logs.update_progress(context)
  }
}

async function pull_all(context: Context) {
  console.log('collecting all movies')
  await collect_all_movies(context)
  console.log('collecting all tv series')
  await collect_all_tv_series(context)
}

export { pull_all }
