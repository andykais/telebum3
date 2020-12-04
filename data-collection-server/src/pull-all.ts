import { createClient } from '@supabase/supabase-js'
import { get_env_var, fetch_binary, fetch_json } from './util'

const moviedb_api_key = get_env_var('MOVIEDB_API_KEY')
const supabase_private_key = get_env_var('SUPABASE_PRIVATE_KEY')

const options = {}
const supabase_telebum_url = 'https://scpjtuqjxrphrqlsfwio.supabase.co'
const supabase = createClient(supabase_telebum_url, supabase_private_key, options)

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
async function collect_all_movies() {
  const todays_date_formatted = format_date_for_urls()
  const url = `http://files.tmdb.org/p/exports/movie_ids_${todays_date_formatted}.json.gz`

  const movie_ids_str = await fetch_binary(url)
  const movie_ids = movie_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))
    .slice(0, 1)

  for (const i of movie_ids.keys()) {
    const { id } = movie_ids[i]
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${moviedb_api_key}`
    const movie_data = await fetch_json(url)
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
      poster_url: movie_data.poster_url
    }
    const { data, error } = await supabase.from('movies').insert([row_data])
    console.log({ data, error })
    // await fs.promises.writeFile(`movie_data/${id}.json`, JSON.stringify(movie_data))
    const percentage_done = ((i + 1) / movie_ids.length) * 100
    console.log(`saved movie ${i + 1} of ${movie_ids.length} (${percentage_done.toFixed(3)}%)`)
  }
}

// async function collect_all_episodes() {
//   const todays_date = new Date()
//   const todays_date_formatted = `${todays_date
//     .getMonth()
//     .toString()
//     .padStart(2, '0')}_${todays_date
//     .getDay()
//     .toString()
//     .padStart(2, '0')}_${todays_date.getFullYear()}`
//   const url = `http://files.tmdb.org/p/exports/tv_series_ids_${todays_date_formatted}.json.gz`
//   const tv_series_ids_str = await fetch_binary(url)
//   const tv_series_ids = tv_series_ids_str
//     .trim()
//     .split('\n')
//     .map(r => JSON.parse(r))

//   for (const i of tv_series_ids.keys()) {
//     const { id } = tv_series_ids[i]
//     const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
//     const tv_series_data = await fetch_json(url)
//     tv_series_data.seasons_data = []
//     for (const season of tv_series_data.seasons) {
//       const url = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
//       const season_data = await fetch_json(url)
//       tv_series_data.seasons_data.push(season_data)
//     }
//     await fs.promises.writeFile(`tv_series_data/${id}.json`, JSON.stringify(tv_series_data))
//     const percentage_done = ((i + 1) / tv_series_ids.length) * 100
//     console.log(`saved tv series ${i + 1} of ${tv_series_ids.length} (${percentage_done.toFixed(3)}%)`)
//   }
// }

collect_all_movies().catch(e => {
  console.error(e)
  console.error('encountered fatal error, exiting')
  process.exit(1)
})
