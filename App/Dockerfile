FROM nginx:alpine

ENV NODE_ENV 'production'
ENV EBAY_API 'http://localhost:3010'

COPY configs/nginx.conf /etc/nginx/nginx.conf
COPY dist/ /data/www

CMD ["nginx", "-g", "daemon off;"]
