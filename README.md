Project Title
This project is a sophisticated web application built with pure Modern JavaScript, incorporating polyfills for IE11 compatibility. It mimics the reactivity in frameworks like Vue using vite and utility-first CSS frameworks like Tailwind, though it relies on vanilla JavaScript and custom methodologies to achieve these effects.

## Project Structure
The project is organized as follows:

```
├── public
└── src
    ├── api
    │   └── data
    ├── assets
    │   ├── fonts
    │   ├── images
    │   └── utils
    ├── components
    ├── core
    ├── logic
    ├── store
    ├── types
    ├── utilities
    └── views
```    
## Key Directories and Files
**/public:** Contains static assets that will be served directly.

**/src:** The source directory for all the project's code.

**api/data:** Stores JSON data for state manipulation and object fetching.

### assets:
**fonts:** Custom fonts used in the project.

**images:** Image files.

**utils:** Utility classes and mixins, including spacings and utilities similar to Tailwind.

**components:** Contains individual components and their structures such as `speed, heater, etc...`

**core:** Includes core functionalities for reactivity, such as the reactivity system (State.ts), state management (StateManager), and rendering (renderer).

**logic:** Logic for mutating and re-rendering the DOM.

**store:** Manages application states.

**types:** TypeScript types or interfaces.

**utilities:** Includes IE11 hacks and other utility functions.

**views:** HTML templates for the views.

## Core Concepts

**Reactivity:** The core folder contains the essence of our reactivity model:

- **State.ts** implements the reactivity system, supporting both IE11 and modern browsers using Proxy.

- **StateManager** is responsible for mutating states and subscribing components, ensuring the reactivity system's reliability.

- **renderer** dynamically renders HTML templates based on state changes.

## Technologies 


**SASS** for Styling: Utilizes SASS for CSS, with utility classes and mixins in assets/utils similar to Tailwind's approach. breakpoints.scss enables dynamic implementation of media queries.

**Vite** 
