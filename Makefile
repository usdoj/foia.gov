
all: build test

build:
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

test:
	bin/htmlproofer.sh
	diff -r -q -X .proofsignore _site _www.foia.gov-proofs

deploy:
	bin/cf_deploy.sh foia-dot-gov doj-foia-discovery prototype

.PHONY: all build deploy test
