# Contributing

Help us to improve this GitHub Action! We welcome your help!

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Tests

Tests are written in [Jest](https://jestjs.io/en/). Tests automatically run on check in.

### To run tests locally

1. run `npm install` to install dependencies
1. run `npm test` to run tests

### To run action locally

1. `npm install` to install dependencies
1. create a Github Personal Access Token at https://github.com/settings/tokens
1. create a `.env` file similar to `.env.example`
1. modify contents of [/tests/fixtures/actionTrigger.json](./tests/fixtures/actionTrigger.json) as needed for test data
1. run `npm start` to run locally

## Debugging

If you've followed the steps above and it isn't working, trying the following:

- If you don't see an Actions tab in your repo, make sure your repo is private and make sure you've been accepted into the private beta.
- If you see the Actions tab but there isn't a comment on your new issue, click on the Log link on the action to view the log and check for errors.

## Extending

Some helpful resources:

- [GitHub Actions Docs](https://developer.github.com/actions/)
- [Octokit Rest.js Docs](https://octokit.github.io/rest.js/#api-Issues-createComment)
- [Dockerfile Docs](https://docs.docker.com/engine/reference/builder/)

## Submitting a Pull Request

1. [Fork][fork] and clone the repository.
1. Configure and install the dependencies: `npm install`.
1. Make sure the tests pass on your machine: `npm test`.
1. Create a new branch: `git checkout -b my-branch-name`.
1. Make your change, add tests, and make sure the tests still pass.
1. Push to your fork and [submit a pull request][pr]. Make sure tests are passing.
1. Pat your self on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Write and update tests.
- Write and update docs and examples.
- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocked you.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
