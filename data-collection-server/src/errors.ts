class SupabaseError extends Error {
  name = 'SupabaseError'
  constructor(error: object) {
    super(`query failed:\n${JSON.stringify(error, null, 2)}`)
  }
}

class MovieDbError extends Error {}

export { SupabaseError, MovieDbError }
