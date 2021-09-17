JEKYLL_ENV=$(NODE_ENV)
JEKYLL_OPTS=

ifeq ($(APP_ENV), development)
  JEKYLL_OPTS+=--config _config.yml,_config.development.yml
endif

ifeq ($(APP_ENV), staging)
  JEKYLL_OPTS+=--config _config.yml,_config.staging.yml
endif

ifeq ($(APP_ENV), uat)
  JEKYLL_OPTS+=--config _config.yml,_config.uat.yml
endif

ifeq ($(APP_ENV), production)
  JEKYLL_OPTS+=--config _config.yml,_config.production.yml
endif

ifeq ($(APP_ENV), ddev)
  JEKYLL_OPTS+=--config _config.yml,_config.ddev.yml
endif

all: build test

build:
	npm run build
	mkdir -p www.foia.gov/assets
	cp -R node_modules/uswds/dist/fonts node_modules/uswds/dist/img www.foia.gov/assets
	cp node_modules/exitscript/exitscript.min.js www.foia.gov/assets/js/
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll build $(JEKYLL_OPTS)

clean:
	-pkill -f -9 jekyll
	rm -rf www.foia.gov/assets
	rm -rf _site

serve:
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll serve $(JEKYLL_OPTS)

serve.detached: clean build
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll serve --detach --skip-initial-build $(JEKYLL_OPTS)

test.features: serve.detached
	npx cucumber-js

test: test.features
	npm test
	npm run lint
	bin/htmlproofer.sh
	@echo OK


.PHONY: all build clean deploy test
