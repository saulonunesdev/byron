'use strict'
require('dotenv').config()
var restify = require('restify')
var server = restify.createServer()
const nodemailer = require('nodemailer')
const corsMiddleware = require('restify-cors-middleware')

const base64Decode = (encodeData) => {
  const buff = Buffer.from(encodeData, 'base64')
  return buff.toString('ascii')
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

function sendMail (email, callback) {
  transporter.sendMail({
    from: process.env.EMAIL_ORIGIN,
    to: email.emails,
    subject: process.env.EMAIL_SUBJECT + email.term,
    html: base64Decode(email.html)
  },
  (err, response) => {
    if (err) {
      callback(err)
    } else {
      callback(response.response)
    }
  })
}

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.post('/email', (req, res, next) => {
  sendMail(req.body, (_resp) => {
    res.send(_resp)
    next()
  })
})

server.listen(process.env.SERVER_PORT, function () {
  console.log('%s listening at %s', server.name, server.url)
})
