import * as errors from './errors'
import type { definitions as tables } from './types/supabase'
import type { Context } from './index'

type LogState = tables['data_collection_logs']['status']

async function get_last_successful_log(
  context: Context
): Promise<tables['data_collection_logs'] | undefined> {
  const res = await context.supabase
    .from<tables['data_collection_logs']>('data_collection_logs')
    .select()
    .filter('status', 'eq', 'COMPLETED')
    .limit(1)
  if (res.error) throw new errors.SupabaseError(res.error)
  const row = res.data![0] || undefined
  return row
}

async function start_new_log(context: Context): Promise<tables['data_collection_logs']> {
  const res = await context.supabase
    .from<tables['data_collection_logs']>('data_collection_logs')
    .insert([{ status: 'STARTED' }])
  if (res.error) throw new errors.SupabaseError(res.error)
  return res.data![0]
}

async function update_progress(context: Context) {
  // prettier-ignore
  const movie_progress_percentage = (context.stats.movies.created + context.stats.movies.updated) / context.stats.movies.total_queued
  // prettier-ignore
  const tv_series_progress_percentage = (context.stats.tv_series.created + context.stats.tv_series.updated) / context.stats.tv_series.total_queued
  // console.log(`movie percentage ${movie_progress_percentage * 100}%`)
  // console.log(`tv series percentage ${tv_series_progress_percentage * 100}%`)
  const res = await context.supabase
    .from<tables['data_collection_logs']>('data_collection_logs')
    .update({
      stats: JSON.stringify(context.stats),
      movie_progress_percentage,
      tv_series_progress_percentage,
    })
    .eq('id', context.log_id)
  if (res.error) throw new errors.SupabaseError(res.error)
}

async function update_status(
  context: Context,
  id: number,
  status: LogState,
  error?: Error
): Promise<tables['data_collection_logs']> {
  const res = await context.supabase
    .from<tables['data_collection_logs']>('data_collection_logs')
    .update({
      status,
      error: error ? error.toString() : undefined,
      stats: JSON.stringify(context.stats),
    })
    .eq('id', id)
  if (res.error) throw new errors.SupabaseError(res.error)
  return res.data![0]
}

export { get_last_successful_log, start_new_log, update_progress, update_status }
