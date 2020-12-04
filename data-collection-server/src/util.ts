import zlib from 'zlib'
import fetch from 'node-fetch'
import type { RequestInit } from 'node-fetch'

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
  if (!response.ok) throw new Error(`Request failed:\n${url}\n\n${await response.text()}`)
  const json = await response.json()
  return json
}

export { get_env_var, fetch_binary, fetch_json }