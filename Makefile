
DIFFOPTS=-u -i -b -w -B -r -X .canaryignore

ifneq ($(DEBUG), 1)
  DIFFOPTS+=-q
endif

all: build test

build:
	npm run build
	mkdir -p www.foia.gov/assets
	cp -R node_modules/uswds/dist/fonts node_modules/uswds/dist/img www.foia.gov/assets
	bundle exec jekyll build

clean:
	rm -rf www.foia.gov/assets
	rm -rf _site

serve:
	npm run watch &
	bundle exec jekyll build --watch &
	node js/dev-server.js

test:
	npm test
	npm run lint
	bin/htmlproofer.sh
	# Canary test. Make sure any changes to the static content is
	# intentional. If any differences are output, confirm they were
	# intentional and update the canary.
	diff $(DIFFOPTS) _www.foia.gov-canary _site
	@echo OK


.PHONY: all build clean deploy test
