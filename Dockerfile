# build stage
FROM node:19.0.0

ARG WEB_PATH=/www/wwwroot/handwrite

RUN mkdir -p $WEB_PATH

WORKDIR $WEB_PATH
COPY package.json $WEB_PATH/
RUN npm install --force

COPY . $WEB_PATH/
RUN npm run build:local
 