import type { Response } from 'node-fetch'

class SupabaseError extends Error {
  name = 'SupabaseError'
  constructor(error: object, query_data?: any) {
    super(
      `query failed:\n${JSON.stringify(error, null, 2)}\nquery data:\n${JSON.stringify(query_data)}`
    )
  }
}

class FetchError extends Error {
  name = 'FetchError'

  public status: number

  constructor(response: Response, response_body: string) {
    super(`Request failed: ${response.statusText}\n${response_body}`)
    this.status = response.status
  }
}

class MovieDbError extends Error {}

export { SupabaseError, MovieDbError, FetchError }
