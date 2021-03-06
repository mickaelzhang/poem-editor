# Benjamin le Renard poète

## Team member
* Alexandre Chichportich
* Julien Girardeau
* Aurélien Marrast
* Corentin Marzin
* Lucie Zevaco
* Mickaël Zhang

## Getting started
### Requirements

In order to recompile the sources, you will need :
* **Node**
* **Yarn** or **Npm**
* **Gulp**

### Installation

In order to start the project, you must clone and install all dependencies first.

```
git clone https://github.com/mickaelzhang/poem-editor.git
cd poem-editor
yarn install
composer install
```

You then need to start a local server with tool such as MAMP to see it live.

## Convention
### General
To have a unity in code convention a **.editorconfig** is setup.
You can install one of those plugins for your editor :

[Link to editorconfig.org](http://editorconfig.org/#download)

### Coding convention

- CSS -> BEM
- JS  -> camelCase

### Commit - Tags
- [X] [ADD] - Used when we add new files or dependencies
- [X] [UPDATE] - Used when we update important part of the project
- [X] [FIX] - Used when we fix bugs, codes and other stuff
- [X] [MERGE] - Used when we merged our branches

### Gulp command
- `gulp` : Default command, will start watching files and launch browser-sync
- `gulp build` : Build asset just once
- `gulp dist` : Export into a functional project for production (Don't work right now)
