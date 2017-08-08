
DIFFOPTS=-u -b -B -r -X .canaryignore

ifneq ($(DEBUG), 1)
  DIFFOPTS+=-q
endif

all: build test

build:
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

test:
	bin/htmlproofer.sh
	# Canary test. Make sure any changes to the static content is
	# intentional. If any differences are output, confirm they were
	# intentional and update the canary.
	diff $(DIFFOPTS) _www.foia.gov-canary _site
	@echo OK

deploy:
	bin/cf_deploy.sh foia-dot-gov doj-foia-discovery prototype

.PHONY: all build deploy test
