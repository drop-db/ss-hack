FROM node:10.16.0-alpine

RUN apk update
RUN apk upgrade
RUN apk add --update ca-certificates git

EXPOSE 3000

RUN git clone https://github.com/drop-db/ss-hack
RUN cd /ss-hack/front && npm i && npm run build
WORKDIR /ss-hack/core

RUN npm i

ENTRYPOINT ["npm", "start"]
