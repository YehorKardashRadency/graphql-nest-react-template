# Backend

## Installation

```bash
cd ./backend/
npm install
```

## Starting database

```bash
docker-compose up postgresqldb
```

## Managing migrations

```bash
# create migration
$ npm run typeorm:generate-migration --name=<Name> --root=./apps/<app>

# Run migration
$ npm run typeorm:run-migrations --root=./apps/<app>

# Revert migration
$ npm run typeorm:revert-migration --root=./apps/<app>
```

## Running the app

```bash
# start all microservices(update package.json if you add a new one)
$ npm run start:microservices
# start the gateway in a separate terminal
$ npm run start:gateway
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
