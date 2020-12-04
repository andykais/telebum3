import fs from 'fs'
import * as zlib from 'zlib'
import fetch from 'node-fetch'
import type { RequestInit, Headers } from 'node-fetch'

const API_KEY = 'b6c34a4db7ffb2f161ee40d1ccdba70c'

async function fetch_binary(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Request failed:\n\n${url}\n${await response.text()}`)
  return new Promise<string>((resolve, reject) => {
    const buffer: string[] = []
    const gunzip = zlib.createGunzip()
    response.body.pipe(gunzip)
    response.body.on('error', reject)
    gunzip
      .on('data', data => buffer.push(data.toString()))
      .on('end', () => resolve(buffer.join('')))
      .on('error', reject)
  })
}

async function fetch_json(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Request failed:\n${url}\n\n${await response.text()}`)
  const json = await response.json()
  return json
}

async function collect_all_movies() {
  const todays_date = new Date()
  const todays_date_formatted = `${todays_date
    .getMonth()
    .toString()
    .padStart(2, '0')}_${todays_date
    .getDay()
    .toString()
    .padStart(2, '0')}_${todays_date.getFullYear()}`
  const url = `http://files.tmdb.org/p/exports/movie_ids_${todays_date_formatted}.json.gz`

  const movie_ids_str = await fetch_binary(url)
  const movie_ids = movie_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))

  for (const i of movie_ids.keys()) {
    const { id } = movie_ids[i]
    const movie_data = await fetch_json(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
    await fs.promises.writeFile(`movie_data/${id}.json`, JSON.stringify(movie_data))
    const percentage_done = ((i + 1) / movie_ids.length) * 100
    console.log(`saved movie ${i + 1} of ${movie_ids.length} (${percentage_done.toFixed(3)}%)`)
  }
}

async function collect_all_episodes() {
  const todays_date = new Date()
  const todays_date_formatted = `${todays_date
    .getMonth()
    .toString()
    .padStart(2, '0')}_${todays_date
    .getDay()
    .toString()
    .padStart(2, '0')}_${todays_date.getFullYear()}`
  const url = `http://files.tmdb.org/p/exports/tv_series_ids_${todays_date_formatted}.json.gz`
  const tv_series_ids_str = await fetch_binary(url)
  const tv_series_ids = tv_series_ids_str
    .trim()
    .split('\n')
    .map(r => JSON.parse(r))

  for (const i of tv_series_ids.keys()) {
    const { id } = tv_series_ids[i]
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
    const tv_series_data = await fetch_json(url)
    tv_series_data.seasons_data = []
    for (const season of tv_series_data.seasons) {
      const url = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
      const season_data = await fetch_json(url)
      tv_series_data.seasons_data.push(season_data)
    }
    await fs.promises.writeFile(`tv_series_data/${id}.json`, JSON.stringify(tv_series_data))
    const percentage_done = ((i + 1) / tv_series_ids.length) * 100
    console.log(`saved tv series ${i + 1} of ${tv_series_ids.length} (${percentage_done.toFixed(3)}%)`)
  }
}

collect_all_episodes().catch(e => {
// collect_all_movies().catch(e => {
  console.error(e)
  console.error('encountered fatal error, exiting')
  process.exit(1)
})
