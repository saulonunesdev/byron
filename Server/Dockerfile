FROM node:alpine

ENV EBAY_API 'http://localhost:3010'
ENV EMAIL_API 'http://localhost:3009'
ENV SERVER_MIN 1

RUN mkdir /Projetos/
WORKDIR /Projetos/

COPY . /Projetos/

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        && npm install

EXPOSE 3008

CMD [ "node", "index.js" ]
