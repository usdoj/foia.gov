ARG PHP_VERSION="8.0"
ARG COMPOSER_VERSION="2.3"
ARG NODE_VERSION="16"

FROM forumone/composer:${COMPOSER_VERSION}-php-${PHP_VERSION} AS base

# In some instances this is required.
WORKDIR /var/www/html

# This will copy everything into the dockerfile other than
# those excluded in the .dockerignore
COPY . .

# Install without dev dependencies
RUN set -ex \
  && composer install --no-dev --optimize-autoloader --ignore-platform-reqs \
  && composer drupal:scaffold

#Gesso
FROM forumone/gesso:5-node-v${NODE_VERSION}-php-${PHP_VERSION} AS theme-base

WORKDIR /app

COPY ["docroot/themes", "./"]

FROM theme-base AS theme

# Building artifact
FROM busybox AS artifact

WORKDIR /var/www/html

COPY --from=base ["/var/www/html", "./"]
COPY --from=theme ["/app", "docroot/themes"]

FROM artifact
