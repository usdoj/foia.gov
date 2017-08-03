
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
	diff -b -B -r -q -X .proofsignore _site _www.foia.gov-proofs
	@echo OK

deploy:
	bin/cf_deploy.sh foia-dot-gov doj-foia-discovery prototype

.PHONY: all build deploy test
