# tv-maze-dashboard

A vue.js based dashboard that integrates with the TV Maze API. (https://www.tvmaze.com/api)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Architechtural Decisions and Details

Node version: 24.14.1
Vue version: 3.5.32
NPM version 11.4.2

### Tailwind CSS

The utility framework provided by tailwind simplifies implementation of components and enables responsive design without using an existing component library.

### Figma and UI Designs

A basic design was implmented using fimga: https://www.figma.com/design/1Udpud3wIOIQ3WPMLNXk5N/TV-Dashboard. The implmentation was updated to better match the data recieved from the API.

### Data Loading Strategy

The TVMaze Show Index endpoint returns shows sorted by ID, not rating. Since the spec requires shows grouped by genre and sorted by rating, accurate rankings require fetching a meaningful portion of the dataset.

After investigating the API, later pages predominantly contain shows with null ratings or missing content which should be filtered out regardless. The chosen approach fetches the first 3 pages (~750 shows) on initial load, providing sufficient genre and rating coverage while keeping load time acceptable.

### Production Architecture

Ideally in production, the client-side data management would be replaced by a dedicated backend service running a daily sync against the TVMaze API, storing pre-processed data in a document database with a Redis caching layer. The frontend would consume a clean internal API with no client-side processing required.

## Known Limitations & Future Improvements

### Performance

- **Skeleton loaders** - not implemented due to time constraints
- **Virtual scrolling** - large genre rows cause a brief render delay on navigation. Virtual scroll would recycle DOM nodes and improve performance significantly
- **Genre row lazy loading** - Intersection Observer was considered to defer off-screen genre rows but was not implemented
- **Error Handling** - Currently there is little to no error handling and this should be improved upon as the system will hit failures.

### Data & Caching

- **Partial data load**: only the first 3 pages of the show index are loaded. Higher rated shows on later pages may be absent from genre rows
- **Background loading**: progressive background fetching of remaining pages was planned but not implemented within the time available
- **Local Caching**: Cache the index calls to the local storage with a TTL to refresh after 24 hours, determined out of scope as the primary bottle neck is in the UI rendering.

### Features

- **Cast members** - the TVMaze cast endpoint was identified but not integrated
- **Unit test coverage** - only core utility functions are covered. Component and store tests were not completed within the time available
