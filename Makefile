
test:
	@echo No tests, OK.

clean deploy:
	$(MAKE) -C www.foia.gov $@

.PHONY: all clean deploy test
