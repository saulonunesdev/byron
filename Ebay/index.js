require('dotenv').config()
var request = require('request')
var restify = require('restify')
var server = restify.createServer()

const base64Encode = (encodeData) => {
  const buff = Buffer.from(encodeData)
  return buff.toString('base64')
}

function getEbayToken (callback) {
  const appId = process.env.EBAY_MODE === 'SANDBOX' ? process.env.EBAY_APP_ID_SBOX : process.env.EBAY_APP_ID
  const appSecret = process.env.EBAY_MODE === 'SANDBOX' ? process.env.EBAY_APP_SECRET_SBOX : process.env.EBAY_APP_SECRET
  const encodedStr = base64Encode(appId + ':' + appSecret)
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

function buildURL (term, _headers, callback) {
  let _url = process.env.EBAY_MODE === 'SANDBOX' ? process.env.EBAY_BASE_URL_SBOX : process.env.EBAY_BASE_URL
  _url += 'search?q=' + term
  _url += '&limit=' + process.env.EBAY_RESULT_COUNT
  _url += '&offset=0'
  _url += '&sort=price'
  _url += '&filter=deliveryCountry:BR'
  const _CatUrl = _url + '&fieldgroups=ASPECT_REFINEMENTS'
  request({ uri: _CatUrl, method: 'GET', headers: _headers, json: true }, function (
    error,
    response,
    data
  ) {
    if (error || data.errors) {
      return callback(_url)
    } else {
      _url += '&category_ids=' + data.refinement.dominantCategoryId
      return callback(_url)
    }
  })
}

function getEbayProducts (term, callback) {
  getEbayToken((oauth) => {
    const _headers = {
      Authorization: 'Bearer ' + oauth,
      'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=BR'
    }
    buildURL(term, _headers, (_url) => {
      request({ uri: _url, method: 'GET', headers: _headers, json: true }, function (
        error,
        response,
        data
      ) {
        if (error) {
          return callback(error)
        } else {
          return callback(data)
        }
      })
    })
  })
}

server.get('/ebay/:term', function (req, res, next) {
  getEbayProducts(req.params.term, (result) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.send(result)
    next()
  })
})

server.listen(process.env.SERVER_PORT, function () {
  console.log('%s listening at %s', server.name, server.url)
})
