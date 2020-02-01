require('dotenv').config()
var request = require('request')
var restify = require('restify')
var server = restify.createServer()

const base64Encode = (encodeData) => {
  const buff = Buffer.from(encodeData)
  return buff.toString('base64')
}

function getEbayToken (callback) {
  const encodedStr = base64Encode(process.env.EBAY_APP_ID + ':' + process.env.EBAY_APP_SECRET)
  const _headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + encodedStr
  }
  const _formData = {
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope'
  }
  const _url = process.env.EBAY_MODE === 'SANDBOX' ? process.env.EBAY_TOKEN_SBOX_URL : process.env.EBAY_TOKEN_URL
  request({ uri: _url, method: 'POST', headers: _headers, json: true, form: _formData }, function (
    error,
    response,
    data
  ) {
    if (error) {
      return callback(error)
    } else {
      return callback(data.access_token)
    }
  })
}

function getEbayProducts (term, callback) {
  getEbayToken((oauth) => {
    const _headers = {
      Authorization: 'Bearer ' + oauth
    }
    let _url = process.env.EBAY_MODE === 'SANDBOX' ? process.env.EBAY_BASE_URL_SBOX : process.env.EBAY_BASE_URL
    _url += 'search?q=' + term
    _url += '&limit=' + process.env.EBAY_RESULT_COUNT
    request({ uri: _url, method: 'GET', headers: _headers, json: true }, function (
      error,
      response,
      data
    ) {
      if (error) {
        callback(error)
      } else {
        return callback(data)
      }
    })
  })
}

server.get('/ebay/:term', function (req, res, next) {
  getEbayProducts(req.params.term, (result) => {
    res.send(result)
    next()
  })
})

server.listen(process.env.SERVER_PORT, function () {
  console.log('%s listening at %s', server.name, server.url)
})
