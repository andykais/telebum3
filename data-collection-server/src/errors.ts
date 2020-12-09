class SupabaseError extends Error {
  name = 'SupabaseError'
  constructor(error: object, query_data?: any) {
    super(`query failed:\n${JSON.stringify(error, null, 2)}\nquery data:\n${JSON.stringify(query_data)}`)
  }
}

class MovieDbError extends Error {}

export { SupabaseError, MovieDbError }
