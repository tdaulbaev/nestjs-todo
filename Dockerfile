FROM node:18-alpine

RUN apk update && apk add bash
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app
COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.sh /opt/startup.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.sh

WORKDIR /usr/src/app
RUN rm -rf .env && cp .env.prod .env

CMD ["/bin/bash", "/opt/startup.sh"]