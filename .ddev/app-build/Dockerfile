ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-buster as nodeJs

FROM ruby:3.0.4

RUN mkdir /app

WORKDIR /app

# Instead of building node from source, just pulling a compiled version already
COPY --from=nodeJs /usr/local/bin/node /usr/local/bin/node
COPY --from=nodeJs /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=nodeJs /opt /opt

# Making the correct symlinks needed for node
RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

RUN npm install -g pm2

# Building App

RUN gem install bundler
