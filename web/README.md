# Telebum Web
This is the telebum website frontend. It talks to the [api-server](./api-server).

## Setup
```bash
npm install
```

## Development
```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Style Guide
- use `prettier` for formatting. There are editor plugins and we use `npm run format` to format the whole project.
- `function` syntax should be preferred over anonymous functions `=>`
- build large components first! Make things modular _after_ it starts to be a pain
- typical svelte component order should go `script`, css, markup

## Production
**Web** runs as a node server in production to allow for server-side-rendering.
```bash
npm run build
```

