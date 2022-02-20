Start Mongo DB docker container

```bash
# start
docker-compose up -d

# stop
docker-compose down
```

## Resources

1. Run mongodb docker container for development
   https://hub.docker.com/r/bitnami/mongodb

2. Install `mongosh` tool
   https://docs.mongodb.com/mongodb-shell/install/#std-label-mdb-shell-install

3. `mongosh` usage
   https://docs.mongodb.com/mongodb-shell/run-commands/

## Migrations

After starting the mongoDb, run javascript files in `/db/migrations` folder sequentially.
If specifies `NODE_ENV=development`, they will be ran in development mode and they would adds seed data as well.
```
export NODE_ENV=development
node /db/migrations/001_create_softball_db.js
node /db/migrations/002_create_players_collection.js
node /db/migrations/003_create_events_collection.js
...
so on
```