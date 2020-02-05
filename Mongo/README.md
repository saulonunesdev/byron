# Server

A Api to Save Searches on MongoDB

```sh
npm install
```

## How to Run

### Localhost

Create a .Env File

```docker
ENV SERVER_PORT 3008
ENV DB_URL 'mongodb://localhost/monitor'
```

then run **tsc** and **node dist/main.js**

### Production

Change ENV *DB_URL* on Dockerfile

the run

```sh
tsc
docker build -t mongoapi .
docker run -itd --name=mongoapic -p 3008:3008 mongoapi
```
