# Acquia Cloud IDE setup

After setting up your Acquia Cloud IDE in the normal way, for the "FOIA Front"
application, here are some extra steps:

Click the blue buttons on the Getting started screen, as normal for cloud IDE.
You may see some errors but just get to the end.

## Repository setup

The folder in which we will do our work is different from the usual "project"
folder that Cloud IDE creates.

Clone the github.com/usdoj/foia.gov repository in the /home/ide folder:

```
cd /home/ide
git clone git@github.com:usdoj/foia.gov.git
```

Go into that folder:

```
cd foia.gov
```

Install dependencies:

```
npm install
bundle install
```

Compile the site, as if for the dev server:

```
APP_ENV=development make build
```

## Cloud IDE tweaks - one-time process

Go into the /home/ide/project folder and delete the docroot folder:

```
cd /home/ide/project
rm -fr docroot
```

Create a symlink, replacing docroot but pointing to the _site folder in the repo:

```
ln -s ../foia.gov/_site docroot
```

Now if you view the cloud IDE preview site, you should see something similar to
the dev site.

## Caveats

Note that this approach does point to the dev backend environment. Unfortunately
we have not yet figured out how to point to a separate Cloud IDE backend.

In the meantime, this let's you develop for the front-end while using the dev
environment as a backend. After making any change, re-compile with another:

```
APP_ENV=development make build
```
