# Server

A Middleware to send Emails through an Api

```sh
npm install
```

then POST **<http://localhost:3009/email>**

body:

```json
{
  "emails": "email1, email2",
  "term": "term",
  "html": "encoded64 html body"
}
```

## How to Run

### Localhost

Create a .Env File

```docker
ENV SERVER_PORT 3009
ENV EMAIL_SERVER 'smtp.ethereal.email'
ENV EMAIL_USER 'abigayle92@ethereal.email'
ENV EMAIL_PASS '9CvWVcq9dQ964HsquN'
ENV EMAIL_PORT 587
ENV EMAIL_SECURE false
ENV EMAIL_ORIGIN 'Byron App <byron@example.com>'
ENV EMAIL_SUBJECT 'Byron Term: '
```

then run **npm start**

### Production

Change ENV *EBAY_APP_ID EBAY_APP_SECRET* on Dockerfile

the run

```sh
docker build -t emailapi .
docker run -itd --name=emailapic -p 3009:3009 emailapi
```
