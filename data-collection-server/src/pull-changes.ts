import { differenceInHours } from 'date-fns'
import { fetch_json } from './util'
import * as logs from './data_collection_logs'
import { collect_movie } from './movies'
import { collect_tv_series } from './tv_series'
import type { Context } from './index'

async function collect_movies_changes_since(context: Context, last_update_date: Date) {
  let total_pages = 1
  for (let page = 1; page <= total_pages; page++) {
    const url = `https://api.themoviedb.org/3/movie/changes?api_key=${context.moviedb_api_key}&start_date=${last_update_date}&page=${page}`
    const movie_data = await fetch_json(url)
    context.stats.movies.total_queued += movie_data.results.length
    await logs.update_progress(context)
    total_pages = movie_data.total_pages
    for (const { id } of movie_data.results) {
      console.log('movie', id)
      await collect_movie(context, id)
      await logs.update_progress(context)
    }
  }
}

async function collect_tv_series_changes_since(context: Context, last_update_date: Date) {
  let total_pages = 1
  for (let page = 1; page <= total_pages; page++) {
    const url = `https://api.themoviedb.org/3/tv/changes?api_key=${context.moviedb_api_key}&start_date=${last_update_date}&page=${page}`
    const tv_series_data = await fetch_json(url)
    for (const { id } of tv_series_data.results) await collect_tv_series(context, id)
    context.stats.tv_series.total_queued += tv_series_data.results.length
    await logs.update_progress(context)
    total_pages = tv_series_data.total_pages
    for (const { id } of tv_series_data.results) {
      await collect_tv_series(context, id)
      await logs.update_progress(context)
    }
  }
}

async function pull_changes(context: Context, last_update_date: Date) {
  const hours_since_last_collection = differenceInHours(last_update_date, new Date())
  console.log(`collecting updated movies since ${hours_since_last_collection} hours ago`)
  await collect_movies_changes_since(context, last_update_date)
  console.log(`collecting updated tv series since ${hours_since_last_collection} hours ago`)
  await collect_tv_series_changes_since(context, last_update_date)
}

export { pull_changes }
