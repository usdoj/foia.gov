
all: build test

build:
	bundle exec jekyll build

test:
	@echo No tests, OK.

deploy:
	bin/cf_deploy.sh foia-dot-gov doj-foia-discovery prototype

.PHONY: all build deploy test
