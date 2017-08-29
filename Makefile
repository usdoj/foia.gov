
DIFFOPTS=-u -b -B -r -X .canaryignore

ifneq ($(DEBUG), 1)
  DIFFOPTS+=-q
endif

all: build test

build:
	npm run build
	mkdir -p www.foia.gov/assets
	#cp -R -t www.foia.gov/assets node_modules/uswds/dist/fonts node_modules/uswds/dist/img
	# for osx
	# cp -R node_modules/uswds/dist/fonts node_modules/uswds/dist/img www.foia.gov/assets
	bundle exec jekyll build

clean:
	rm -rf www.foia.gov/assets

serve:
	npm run watch &
	bundle exec jekyll serve

test:
	npm test
	bin/htmlproofer.sh
	# Canary test. Make sure any changes to the static content is
	# intentional. If any differences are output, confirm they were
	# intentional and update the canary.
	diff $(DIFFOPTS) _www.foia.gov-canary _site
	@echo OK

deploy:
	bin/cf_deploy.sh foia-dot-gov doj-foia-discovery prototype

.PHONY: all build clean deploy test
