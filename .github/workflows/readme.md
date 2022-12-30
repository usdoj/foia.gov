# AUTOMATED DEPLOYMENT

https://github.com/nektos/act
act -j test -l --container-architecture linux/amd64



act --container-architecture linux/amd64

# run only build
act -j build --container-architecture linux/amd64



::error::

The ssh-private-key argument is empty. Maybe the secret has not been configured, or you are using a wrong secret name in your workflow file.


act pull_request --container-architecture linux/amd64



```BASH

# Command structure:
act [<event>] [options]
If no event name passed, will default to "on: push"
If actions handles only one event it will be used as default instead of "on: push"

# List all actions for all events:
act -l

# List the actions for a specific event:
act workflow_dispatch -l

# List the actions for a specific job:
act -j test -l

# Run the default (`push`) event:
act

# Run a specific event:
act pull_request

# Run a specific job:
act -j test

# Run a job in a specific workflow (useful if you have duplicate job names)
act -j lint -W .github/workflows/checks.yml

# Run in dry-run mode:
act -n

# Enable verbose-logging (can be used with any of the above commands)
act -v


# run specific step in file
act -j build -W .github/workflows/dev-deploy.yml  --container-architecture linux/amd64

# run entire file, reuse containers
act  -W .github/workflows/dev-deploy.yml  --container-architecture linux/amd64 --reuse

act -j test -W .github/workflows/dev-deploy.yml  --container-architecture linux/amd64



 ssh-keygen -t ed25519 -C "amir.meshkin@gmail.com"


The ssh-private-key argument is empty. Maybe the secret has not been configured, or you are using a wrong secret name in your workflow file.



# deploy key for fork
ssh-keygen -t ed25519 -C "git@github.com:ameshkin/foia.gov.git"



ssh-add --apple-use-keychain ~/.ssh/fork_deploy_foiagov

# copy

cat ~/.ssh/fork_deploy_foiagov | pbcopy


git@github.com:ameshkin/foia.gov.git

SSH_PRIVATE_KEY
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBrb+R27rEQrteUOdk2C2a0OxwJIebR8ezIfNpm9Nq2gwAAAKhKF8pdShfK
XQAAAAtzc2gtZWQyNTUxOQAAACBrb+R27rEQrteUOdk2C2a0OxwJIebR8ezIfNpm9Nq2gw
AAAEAzHhqD2zJwn3IExCtt7iz+Z5CHtm8I9UbNSoNFZF1Fn2tv5HbusRCu15Q52TYLZrQ7
HAkh5tHx7Mh82mb02raDAAAAJGdpdEBnaXRodWIuY29tOmFtZXNoa2luL2ZvaWEuZ292Lm
dpdAE=
-----END OPENSSH PRIVATE KEY-----



[DEPRECATED] The `--path` flag is deprecated because it relies on being remembered across bundler invocations, which bundler will no longer do in future versions. Instead please use `bundle config set --local path 'vendor/bundle'`, and stop using this flag
| Don't run Bundler as root. Bundler can ask for sudo if it is needed, and
| installing your bundle as root will break this application for all non-root
| users on this machine.
| Fetching gem metadata from https://rubygems.org/.........
| Using bundler 2.3.24



```
