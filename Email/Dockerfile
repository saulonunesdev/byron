FROM node:alpine

ENV SERVER_PORT 3009
ENV EMAIL_SERVER 'smtp.ethereal.email'
ENV EMAIL_USER 'abigayle92@ethereal.email'
ENV EMAIL_PASS '9CvWVcq9dQ964HsquN'
ENV EMAIL_PORT 587
ENV EMAIL_SECURE 'false'
ENV EMAIL_ORIGIN 'Byron App <byron@example.com>'
ENV EMAIL_SUBJECT 'Byron Term: '

RUN mkdir /Projetos/
WORKDIR /Projetos/

COPY . /Projetos/

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        && npm install

EXPOSE 3009

CMD [ "node", "index.js" ]
