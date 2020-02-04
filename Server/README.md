# Server

A Server to send emails automatically

```sh
npm install
```

## How to Run

### Localhost

Create a .Env File

```docker
ENV EBAY_API 'http://localhost:3010'
ENV EMAIL_API 'http://localhost:3009'
ENV SERVER_MIN 1
```

then run **npm start**

### Production

```sh
docker build -t serverbyron .
docker run -itd --name=serverbyronc -p 3008:3008 serverbyron
```
