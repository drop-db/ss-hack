FROM node:10.16.0

RUN apk update
RUN apk upgrade
RUN apk add --update ca-certificates git make python g++ build-base ffmpeg

EXPOSE 3000

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm i
ADD . /app

ENTRYPOINT ["npm", "start"]
