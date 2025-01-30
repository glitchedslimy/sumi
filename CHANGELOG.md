# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2023-05-03 - Project Initialization

### Added

**Initial release**

- Made the initializations for the bot
- Added `Husky`, `Prettier`, `CommitLint` and `Eslint` in the project
- Added `Convict` to keep a configuration file
- Added `Pino` as a logger
- Made the folder of the web
- Create a _CONTIBUTING.md_ file
- Added a Shared folder to keep common dependencies in
- Added a _README.md_ file
- Made the Wiki on Github
- Made the ISSUE_TEMPLATE and PULL_REQUEST_TEMPLATE
- Added pipelines:
  - Greetings
  - CodeQL Analysis
  - Labeler
- All the code shares the same node_modules folder

## [0.1.0] - 04-05-2023 - Project Changes

- Fixed linters
- Added command handler project to have a NPM package of it
- Customized eslint config
- Fixed formatting errors with the command handler package
- Added new package for the linter to work properly

## [0.1.1] - 05-05-2023 - Project Changes

- Now the events can be handler internally by the command handler
- Exposed functions from the handler to the bot in order to make commands more easily
- SubCommand Handling in separate functions
- Path aliasing

## [Released]

## [On Scope]

### Bugs

- None as for now

### Broken features

- Release Pipeline doesn't work properly
- Not added any security check pipeline
- Not added any test
