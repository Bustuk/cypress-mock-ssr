# @cypress/mock-ssr

> Middleware and [Cypress](https://cypress.io) commands for mocking Server Side Rendered (SSR) content in [Cypress](https://cypress.io) tests.

## Install

```sh
$ npm install --dev @cypress/mock-ssr
```

```sh
$ yarn add -D @cypress/mock-ssr
```

## Cypress Commands

The following [Cypress](https://cypress.io) commands are bundled in this module.

### Usage

Require `mockSSRCommands` in the `cypress/support/index.js` in your project.

```js
// cypress/support/index.js
require("./commands")
require("@cypress/mock-ssr/mockSSRCommands")
```

### mockSSR

```js

```

### clearSSRMocks

> NOTE: `clearSSRMocks` is called in global `beforeEach` and `after` hooks when it is `require`d in `cypress/support/index.js`.

`clearSSRMocks` sends a request to the middleware endpoint `/__cypress_clear_mocks` to clear any mocks for the given test. It should be called in a lifecycle hook, such as `beforeEach`.

## Middleware

This module exports [connect middleware](https://github.com/senchalabs/connect) for use in Node.js servers to provide mock routes for mocking and clearing Server Side Rendered (SSR) content.

`cypressMockMiddleware` can be used in any connect based Node.js server including Express, Koa, Next.js, Nuxt.

```js
const { cypressMockMiddleware } = require("@cypress/mock-ssr")

const server = express()

server.use(cypressMockMiddleware())
```

### Express

```js
const express = require("express")
const { cypressMockMiddleware } = require("@cypress/mock-ssr")

const server = express()

server.use(cypressMockMiddleware())

server.get("*", (req, res) => {
  // ...
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
```

### Next.js

```js
const express = require("express")
const next = require("next")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const { cypressMockMiddleware } = require("@cypress/mock-ssr")

app.prepare().then(() => {
  const server = express()

  server.use(cypressMockMiddleware())

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```
