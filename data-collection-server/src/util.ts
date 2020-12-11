import zlib from 'zlib'
import fetch from 'node-fetch'
import type { RequestInit } from 'node-fetch'
import * as errors from './errors'

function get_env_var(key: string): string {
  const env_var = process.env[key]
  if (env_var) return env_var
  else throw new Error(`Environment var ${key} must be supplied`)
}

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
  if (!response.ok) throw new errors.FetchError(response, await response.text())
  const json = await response.json()
  return json
}

async function fetch_moviedb(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  const json = await response.json()
  if (!response.ok) {
    console.log(json)
    if (response.status === 404) throw new errors.MovieDbError(JSON.stringify(json))
    else throw new errors.FetchError(response, JSON.stringify(json))
  }
  return json
}

export { get_env_var, fetch_binary, fetch_json, fetch_moviedb }
