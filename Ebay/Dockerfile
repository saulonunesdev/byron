FROM node:alpine

ENV EBAY_APP_ID_SBOX ''
ENV EBAY_APP_SECRET_SBOX ''
ENV EBAY_APP_ID ''
ENV EBAY_APP_SECRET ''
ENV EBAY_MODE 'PRODUCTION'
ENV EBAY_BASE_URL_SBOX 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/'
ENV EBAY_BASE_URL 'https://api.ebay.com/buy/browse/v1/item_summary/'
ENV EBAY_TOKEN_SBOX_URL 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'
ENV EBAY_TOKEN_URL 'https://api.ebay.com/identity/v1/oauth2/token'
ENV EBAY_RESULT_COUNT 3
ENV SERVER_PORT 3010

RUN mkdir /Projetos/
WORKDIR /Projetos/

COPY . /Projetos/

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        && npm install

EXPOSE 3010

CMD [ "node", "index.js" ]
