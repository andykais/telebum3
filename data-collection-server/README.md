# data collection service

This service is used to push themoviedb data from their databases to our databases. It can be stopped and
started at any time.

## How to run
```
npm install
npm run build
MOVIEDB_API_KEY=<secret> SUPABASE_PRIVATE_KEY=<secret> npm run start:scheduler
```

## Caveats
Note that the _first time_ that this service is ran, it will have to download the whole world from themoviedb.
This will take quite a while. After the first successful run, the service will only download movies & tv shows
that have changed since the last successful run. If the service has not ran successfully for 14 days, it will
again attempt to download the whole world from themoviedb, since 14 days ago is the furthest back themoviedb
allows us to query for changed tv shows and movies

## TODO
- [ ] handle orphaned moviedb ids. E.g. what do we do if themoviedb drops an entry?
