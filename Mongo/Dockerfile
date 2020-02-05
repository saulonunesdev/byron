FROM node:alpine

ENV SERVER_PORT 3008
ENV DB_URL 'mongodb://localhost/monitor'

RUN mkdir /Projetos/
WORKDIR /Projetos/

COPY . /Projetos/

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        && npm install --only=production

EXPOSE 3008

CMD [ "node", "dist/main.js" ]
