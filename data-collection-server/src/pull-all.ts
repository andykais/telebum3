import * as date_fns from 'date-fns'
import * as errors from './errors'
import { fetch_binary } from './util'
import { Scheduler } from './scheduler'
import { collect_movie } from './movies'
import { collect_tv_series } from './tv_series'
import * as logs from './data_collection_logs'
import type { Context } from './index'

const MAX_CONCURRENCY = 10

function format_date_for_urls() {
  // we cannot always trust that the file export is available on the current day (e.g. right at midnight)
  // TODO double check that this is not going to cause us to miss records when we start pulling changes afterwards
  const yesterday = date_fns.subDays(new Date(), 1)
  return date_fns.format(yesterday, 'MM_dd_yyyy')
}

async function collect_all_movies(context: Context) {
  const scheduler = new Scheduler<void>(MAX_CONCURRENCY)
  const todays_date_formatted = format_date_for_urls()
  const url = `http://files.tmdb.org/p/exports/movie_ids_${todays_date_formatted}.json.gz`

  const movie_ids_str = await fetch_binary(url)
  const movie_ids = movie_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))

  console.log(`themoviedb currently has ${movie_ids.length} movies`)
  context.stats.movies.total_queued = movie_ids.length
  await logs.update_progress(context)
  for (const row of movie_ids) {
    const task = async () => {
      console.log(`Uploading "${row.original_title}". ID: ${row.id}`)
      await collect_movie(context, row.id)
      await logs.update_progress(context)
    }
    scheduler.queue_task(task)
  }
  await scheduler.start()
}

async function collect_all_tv_series(context: Context) {
  const scheduler = new Scheduler<void>(MAX_CONCURRENCY)
  const todays_date_formatted = format_date_for_urls()
  const url = `http://files.tmdb.org/p/exports/tv_series_ids_${todays_date_formatted}.json.gz`

  const tv_series_ids_str = await fetch_binary(url)
  const tv_series_ids = tv_series_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))

  console.log(`themoviedb currently has ${tv_series_ids.length} tv series`)
  context.stats.tv_series.total_queued = tv_series_ids.length
  for (const row of tv_series_ids) {
    const task = async () => {
      console.log(row)
      await collect_tv_series(context, row.id)
      await logs.update_progress(context)
    }
  }
  await scheduler.start()
}

async function pull_all(context: Context) {
  console.log('collecting all movies')
  await collect_all_movies(context)
  console.log('collecting all tv series')
  await collect_all_tv_series(context)
}

export { pull_all }
