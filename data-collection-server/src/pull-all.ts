import { fetch_binary } from './util'
import { collect_movie } from './movies'
import { collect_tv_series } from './tv_series'
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
    .slice(100, 101)

  for (const i of movie_ids.keys()) {
    const { id } = movie_ids[i]
    await collect_movie(context, id)
    const percentage_done = ((i + 1) / movie_ids.length) * 100
    console.log(`saved movie ${i + 1} of ${movie_ids.length} (${percentage_done.toFixed(3)}%)`)
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
    .slice(0, 1)

  for (const i of tv_series_ids.keys()) {
    const { id } = tv_series_ids[i]
    await collect_tv_series(context, id)
    const percentage_done = ((i + 1) / tv_series_ids.length) * 100
    console.log(
      `saved tv series ${i + 1} of ${tv_series_ids.length} (${percentage_done.toFixed(3)}%)`
    )
  }
}

async function pull_all(context: Context) {
  await collect_all_movies(context)
  // await collect_all_tv_series(context)
}

export { pull_all }
