# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2023-05-03 - Project Initialization

- Made the project initialization and inital configurations
- Added the first command: `ping`
- Added events needed

## [0.2.0] - 2023-05-06 - Refactoring (Major change)

- Refactored the Command Handler
- Made new structure
- Now the events can be internal or external in case the user needs to use them externally. (You need to do the interactionCreate externally if you want to use it externally).
- Possibility to handle subcommand in separate files.
- Made the project more maintanable and scalable

## [0.2.5] - 2023-07-06 - Bugfixes and release

- There was a slight bug with the routing that only allowed to use the structure like:

```
bot/
    src/
        commands/
            command/
                command.ts
                subcommand.ts
            command2/
                command2.ts
                subcommand2.ts
```

Now should work in both ways:

```
src/
    commands/
        command/
            command.ts
            subcommand.ts
        command2/
            command2.ts
            subcommand2.ts
```
