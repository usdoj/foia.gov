[![CircleCI](https://circleci.com/gh/18F/beta.foia.gov.svg?style=svg)](https://circleci.com/gh/18F/beta.foia.gov)

# foia

New FOIA beta site + national portal. The site is based off of
[18F recommendations](https://github.com/18F/foia-recommendations) from our
discovery sprint with the Department of Justice.


## Content

Majority of the site content is in
[markdown](https://daringfireball.net/projects/markdown/syntax) format. Markdown
is intended to be as easy-to-read and easy-to-write as is feasible. Here are
some resources for working with markdown.

- [Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
- [Mastering markdown](https://guides.github.com/features/mastering-markdown/)
- [Edit this file in markdown](https://github.com/18F/beta.foia.gov/edit/develop/README.md)

The entire site can be edited directly from this Github repository. Here are
some resources for working with Github.

- [Editing files in your repository](https://help.github.com/articles/editing-files-in-your-repository/)
- [Introduction to GitHub for Newcomers](https://www.youtube.com/watch?v=uNa9GOtM6NE)
- [Github help](https://help.github.com/)


### Workflow

This Github repository is setup with continuous deployment. That means that any
change you make, approve, and merge will be automatically deployed. This means
you can easily see the changes you make in the development environment and once
approved, deploy to production automatically. The process in general works like
this:

1. Edit a file on Github.
1. Commit the change to the `develop` branch.
1. _Any change made to `develop` will be automatically deployed to the [development environment](https://dev-www.foia.gov/)._
1. Review the change on the development environment.
1. Open a [pull request](https://github.com/18F/beta.foia.gov/compare/master...develop) against the `master` branch.
1. Have a teammate [review and approve](https://help.github.com/articles/about-pull-request-reviews/) the code change in [Github](https://github.com/18F/beta.foia.gov/pulls).
1. Merge the pull request.
1. _The change will be automatically deployed to the [production environment](https://beta.foia.gov/)._

For the nitty-gritty details of how automated deployment works, please see the
[deployment
documentation](https://github.com/18F/beta.foia.gov/tree/develop/docs/deployment.md).

### Web content

Site content lives in the markdown pages under the [www.foia.gov
directory](/usdoj/foia.gov/tree/develop/www.foia.gov).

[Glossary terms](/18F/beta.foia.gov/tree/develop/www.foia.gov/_glossary_terms)
should be edited in markdown, one term per file. The name of the file is not
important. The term is pulled from the front matter within the file.

The primary and secondary navigation items live in the [site configuration
file](https://github.com/18F/beta.foia.gov/blob/develop/_config.yml).

The landing page content lives in
[configuration](https://github.com/18F/beta.foia.gov/blob/develop/www.foia.gov/index.html)
and in the [layout](https://github.com/18F/beta.foia.gov/blob/develop/www.foia.gov/_layouts/home.html).

Footer links can be edited in the [site
footer](https://github.com/18F/beta.foia.gov/blob/develop/www.foia.gov/_includes/footer.html).


### FOIA request forms

Individual agency FOIA request forms live in the [back
stage][foia-back-stage] and are owned by OIP. However, the per-section
help text (blue box content) can be edited [one section per-file in
markdown](/18F/beta.foia.gov/tree/develop/www.foia.gov/_request_form_sections).
The files should be numbered so they appear in the correct order, but the name
of the file is not important.

_Note: You should avoid changing the front matter in these files. The front stage
javascript application depends on this information._


### Agency contact information

Contact information lives in the [back stage][foia-back-stage] but this
information should be updated individually by agency FOIA personnel.


## Development

Please browse the [additional documentation
topics](https://github.com/18F/beta.foia.gov/tree/develop/docs) on development.


[foia-back-stage]: https://admin.foia.gov/
