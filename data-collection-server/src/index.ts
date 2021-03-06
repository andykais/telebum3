import 'source-map-support/register'
import { createClient } from '@supabase/supabase-js'
import { get_env_var, fetch_binary, fetch_json } from './util'
import { pull_all } from './pull-all'
import { pull_changes } from './pull-changes'
import { subDays } from 'date-fns'
import * as logs from './data_collection_logs'
import type { definitions as tables } from './types/supabase'

type SupabaseClient = ReturnType<typeof createClient>

type Context = ReturnType<typeof init_context>
function init_context() {
  const moviedb_api_key = get_env_var('MOVIEDB_API_KEY')
  const supabase_private_key = get_env_var('SUPABASE_PRIVATE_KEY')

  const options = { schema: 'public' }
  const supabase_telebum_url = 'https://scpjtuqjxrphrqlsfwio.supabase.co'
  const supabase = createClient(supabase_telebum_url, supabase_private_key, options)
  const stats = {
    movies: { created: 0, updated: 0, total_queued: 0, failed: [] as any[] },
    tv_series: { created: 0, updated: 0, total_queued: 0, failed: [] as any[] },
    tv_seasons: { created: 0, updated: 0, failed: [] as any[] },
    tv_episodes: { created: 0, updated: 0, failed: [] as any[] },
  }
  let log_id: number | undefined
  return { supabase, moviedb_api_key, stats, log_id }
}

async function start() {
  console.log('initialize data collector')
  const context = init_context()
  const prev_log = await logs.get_last_successful_log(context)
  const new_log = await logs.start_new_log(context)
  context.log_id = new_log.id

  const oldest_date_themoviedb_can_query_for_changes = subDays(new Date(), 14)

  try {
    if (prev_log === undefined) await pull_all(context)
    else {
      const last_ran_date = new Date(prev_log.inserted_at)
      if (last_ran_date < oldest_date_themoviedb_can_query_for_changes) await pull_all(context)
      else await pull_changes(context, last_ran_date)
    }
    await logs.update_status(context, new_log.id, 'COMPLETED')
    console.log('data collector completed', context.stats)
  } catch (e) {
    console.error(e)
    await logs.update_status(context, new_log.id, 'ERRORED', e)
    console.error('encountered error while writing data, logging and exiting')
    throw e
  }
}

// themoviedb's smallest update interval is once every 24 hours
const twenty_four_hours_in_millis = 1000 * 60 * 60 * 24
async function schedule() {
  await start()
  setInterval(() => {
    start()
  }, twenty_four_hours_in_millis)
}

if (process.argv0[2] === '--scheduler') {
  schedule()
} else {
  start()
}

export type { Context }
