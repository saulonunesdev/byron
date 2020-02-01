# Server

A Middleware to search Ebay products via Query Api

```sh
npm install
```

then GET **<http://localhost:3010/ebay/TERM>**

## How to Run

### Localhost

Create a .Env File

```js
EBAY_APP_ID = 'YOURAPPID'
EBAY_APP_SECRET = 'YOURAPPSECRET'
EBAY_APP_ID_SBOX = 'YOURAPPID'
EBAY_APP_SECRET_SBOX = 'YOURAPPSECREexT'
EBAY_MODE = 'SANDBOX'
#EBAY_MODE = 'PRODUCTION'
EBAY_BASE_URL_SBOX = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/'
EBAY_BASE_URL = 'https://svcs.ebay.com/services/search/FindingService/v1'
EBAY_TOKEN_SBOX_URL = 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'
EBAY_TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token'
EBAY_RESULT_COUNT = 3
```

then run **npm start**

### Production

Change ENV *EBAY_APP_ID EBAY_APP_SECRET* on Dockerfile

the run

```sh
docker build -t ebayapi .
docker run -itd --name=ebayapic -p 3010:3010 ebayapi
```
