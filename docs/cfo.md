# Chief FOIA Council Pages

### How to set up menu items for CFO Pages.
- Add respective routes to _config.yml file under the Chief FOIA Officers Council section.
- Inside of bin/htmlproofer.sh, which handles html proofing for the app, add or edit routes, making sure to backslash any forward slashes, in the **IGNORE_HREFS** variable

### React Routing location for CFO pages.
React routes are set up in the js/chief_foia_officers_council.jsx page.
It uses the basename of "chief-foia-officers-council". Everything else is dynamically built off of that route.
