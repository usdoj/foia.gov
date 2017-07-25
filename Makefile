clean:
	perl -pi -e 's,https://www.foia.gov/,,g' *html

deploy:
	cf push foia-dot-gov
