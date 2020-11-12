# React Client

Run `yarn` to install/update require packages.

[react-router.com](https://reacttraining.com/react-router/)  
[flow.org](https://flow.org/)  
[styled-components.com](https://www.styled-components.com/)

## Directory Structure

```
src
 |-- components
 |   |-- NavBar.js
 |   |-- Tile.js
 |   +-- [Common react components for use throughout app]
 |-- pages
 |   |-- Home.js
 |   |-- Manage.js
 |   |-- Book.js
 |   +-- [Pages with distinct purposes, directed to with react-router]
 |-- static
 |   |-- index.html
 |   +-- [Static files, templates, stylesheets, etc.]
 |-- utils
 |   |-- functions.js
 |   +-- [Common utilities and functions for logic]
 |-- App.js    [React App entry point]
 |-- index.js  [DOM entry point]
```

## Yarn Scripts

 - `build`
   - builds production html/js for deployment  
 - `dev`
   - start a dev instance (watches code)  
 - `lint`
   - run eslint  
 - `flow`
   - static type checking
 - `test`
   - `lint` && `flow` && `build`
 - `deploy`
   - deploy to [gh-pages](https://comp3300-comp9900-term-3-2019.github.io/capstone-project-scrumdaddy-and-the-devs/)

## Git Hooks

**Hooks apply only for master: ensures code on master is correct and only deploys latest working build to gh-pages**

 - pre-commit: lint and type check
 - pre-push: build and deploy

## Recommended VSCode Extensions

 - formulahendry.auto-close-tag
 - formulahendry.auto-rename-tag
 - dbaeumer.vscode-eslint
 - jpoissonnier.vscode-styled-components
 - flowtype.flow-for-vscode
