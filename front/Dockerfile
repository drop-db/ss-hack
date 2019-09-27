FROM nginx:1.15-alpine

RUN apk add nodejs npm git
RUN rm -rf /var/cache/apk/*

RUN git clone https://github.com/drop-db/ss-hack
RUN ls
RUN pwd
WORKDIR /ss-hack/front

RUN npm i
RUN npm run build
RUN rm -rf ./node_modules

RUN rm -rf /etc/nginx/conf.d/default.conf
RUN mv /ss-hack/front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
