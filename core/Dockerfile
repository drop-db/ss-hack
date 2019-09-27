FROM node:10.16.0-alpine

RUN apk update
RUN apk upgrade
RUN apk add --update ca-certificates git

EXPOSE 3000

RUN git clone https://github.com/drop-db/ss-hack
WORKDIR /ss-hack/core

RUN npm i

ENTRYPOINT ["npm", "start"]
