import { createClient } from '@supabase/supabase-js'
import { get_env_var, fetch_binary, fetch_json } from './util'
import { pull_all } from './pull-all'
import type { definitions as tables } from './types/supabase'

type SupabaseClient = ReturnType<typeof createClient>
interface Context {
  moviedb_api_key: string
  supabase: SupabaseClient
}
function init_context() {
  const moviedb_api_key = get_env_var('MOVIEDB_API_KEY')
  const supabase_private_key = get_env_var('SUPABASE_PRIVATE_KEY')

  const options = { schema: 'public' }
  const supabase_telebum_url = 'https://scpjtuqjxrphrqlsfwio.supabase.co'
  const supabase = createClient(supabase_telebum_url, supabase_private_key, options)
  return { supabase, moviedb_api_key }
}

async function start() {
  const context = init_context()
  const res = await context.supabase
    .from<tables['data_collection_logs']>('data_collection_logs')
    .select()
    .filter('status', 'eq', 'COMPLETED')
    .limit(1)
  if (res.error) throw new Error(`SupabaseError: query failed: \n${res.error}`)
  const new_log = await context.supabase
    .from<tables['data_collection_logs']>('data_collection_logs')
    .insert([{ status: 'STARTED' }])
  if (new_log.error) throw new Error(`SupabaseError: query failed: \n${new_log.error}`)
  const log_id = new_log.data![0].id

  try {
    if (res.data!.length === 0) await pull_all(context)
    else throw new Error('unimplemented')
  } catch (e) {
    console.error(e)
    const res = await context.supabase
      .from<tables['data_collection_logs']>('data_collection_logs')
      .update({ id: log_id, status: 'ERRORED', error: JSON.stringify(e) })
    console.error('encountered fatal error, logging')
    process.exit(1)
  }
}

start()

export type { Context }
