# FOIA Discovery Team Practices

This document describes the conventions the FOIA Discovery team has agreed to work under.
For information about licensing, code of conduct and contributing to this project,
see the [CONTRIBUTING](CONTRIBUTING.md) file.

## Sprints

We do one-week sprints, with a retro and planning meeting every Monday, and a sprint review
every Friday. We have daily standups with our 18F team, and daily standups with the DOJ team.

## Issues

We use Github + [Zenhub](https://chrome.google.com/webstore/detail/zenhub-for-github/ogcgkffhplmphkaahpmffcafajaocjbd)
for issue tracking. We create issues as necessary to capture stories
and articulate requirements for specific tasks. Our kanban categories for describing the state of
issues are:

### New

Default for created issues.


#### Exit criteria

- Item has been triaged for priority.
- Item moves to Icebox if it is low priority or to Backlog for grooming.


### Icebox

The Icebox is where items go that have lower priority or we are unsure of their state.
This tends to be the dumping grounds of things we'd like to do but there are many
other things with higher priority.


#### Exit criteria

- When reviewing priorities, we may pull items out of the Icebox.
- Items move to Backlog for grooming.


### Backlog

Groomed and ready to be pulled into "In Progress" for the current/upcoming
sprint.


#### Exit criteria

- Item has defined acceptance criteria reviewed by the Product Owner.
- Item is groomed and shovel-ready.
- Item has been prioritized against other work in the Backlog.
- When a team member is ready to take on new work, they pull the first
  unassigned item from the top of the Backlog.


### In Progress

Currently being worked on. Limit 2 per assignee.


#### Exit criteria

- Acceptance criteria has been met.
- For feature code, automated tests have been written.
- Any artifacts, documents, or code is shared and available for the team.


### Review / QA

PR opened and/or task ready for team feedback.


#### Exit criteria

- PRs have been peer reviewed, "Approved", and merged.
- Work has been peer reviewed and acceptance criteria is confirmed to have been
  met.


### Closed

Issue completed.


## Pull Requests

All code changes should happen through pull requests (PRs).

New PRs should be assigned to the person who opens the PR.
If a PR is not ready for review and merge, add the `WIP` label to it,
and prefix the PR name with `[WIP]`.

All PRs should be reviewed by one other team member.
As a reviewer, you are not expected to review `WIP` PRs unless specifically requested.
Prioritize PR reviews over other work, so that PRs do not block other team members.

When a PR has an accepted review, either the reviewer or the owner (assignee)
may merge the PR using either the `Squash and merge` or the `Rebase and merge`
Github big green button. Each PR should result in exactly 1 commit to the `master`
branch.
