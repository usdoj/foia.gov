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

ifeq ($(APP_ENV), platform)
  JEKYLL_OPTS+=--config _config.yml,_config.platform.yml
endif

ifeq ($(APP_ENV), ddev)
  JEKYLL_OPTS+=--config _config.yml,_config.ddev.yml
endif

all: build test

build:
	npm run build
	mkdir -p www.foia.gov/assets
	cp -R _fonts/ www.foia.gov/assets/fonts
	cp -R node_modules/uswds/dist/img www.foia.gov/assets
	cp node_modules/@usdoj/uswds-external-link/extlink.min.js www.foia.gov/assets/js/
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll build $(JEKYLL_OPTS)
	# Reset permissions for DDEV user
	chown -R --reference=js _site

build.reload:
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll build $(JEKYLL_OPTS)
	# Reset permissions for DDEV user
	chown -R --reference=js _site

build.dev:
	JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll build $(JEKYLL_OPTS) --watch --incremental
	# Reset permissions for DDEV user
	chown -R --reference=js _site

clean:
	rm -rf www.foia.gov/assets
	rm -rf _site

serve.dev:
	-pkill -9 -f "node js/dev-server.js"
	node js/dev-server.js

serve:
	./node_modules/.bin/npm-run-all --parallel serve:watch serve:dev

serve.detached:
	-pkill -9 -f "node js/dev-server.js"
	node js/dev-server.js &

test.features:
	npx cucumber-js

test.html:
	bin/htmlproofer.sh

test.lint:
	npm run lint

test.functional:
	npm test

test: clean build serve.detached test.functional test.lint test.html test.features
	@echo OK


.PHONY: all build clean deploy test
