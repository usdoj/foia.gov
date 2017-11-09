# Request app

The Request app is a javascript application that powers the Portal.

The javascript build uses [Webpack](https://webpack.js.org/concepts/) to build
javascript bundles and outputs them to the Jekyll source dir
(`www.foia.gov/assets/js/`). Jekyll treats them as plain old javascript files
and will copy them to the Jekyll build directory (`_site/`) to be deployed.

## Development

This will start the Jekyll server and webpack in watch mode.

    $ make serve

By default, `$APP_ENV` is set to `development` which will use the development
foia-api in the Acquia Cloud environment. If you need to develop against a local
foia-api, set `APP_ENV=local`.

    $ APP_ENV=local make serve


## Tests

The test files are compiled via `mocha-webpack` and then run with mocha.

    $ make test


## Architecture

The javascript files use [React](https://facebook.github.io/react/docs/hello-world.html) with
a [Flux](https://facebook.github.io/flux/docs/in-depth-overview.html#content)
architecture.

The directories are laid out as follows:

* `/js`: Entrypoints (Apps)
* `/js/actions`: Flux Actions and Action Creators
* `/js/components`: UI components (Flux Views)
* `/js/models`: Data models
* `/js/pages`: Individual web pages (Flux Container views)
* `/js/settings`: Environment specific configuration
* `/js/stores`: Flux Stores
* `/js/test`: unit and functional tests
* `/js/util`: libraries and helpers


### Concepts


#### Entrypoint

This is a single js bundle for a page. It contains any js libraries needed for the
page and a single App. The Entrypoint handles routing to individual Pages.


#### Store

A [Store](https://facebook.github.io/flux/docs/in-depth-overview.html#stores)
keeps the state of the application. When actions are dispatched either by a user
action or from the server, the stores process the action and update the state
accordingly. When the stores change, they emit an event so that the App knows to
update and re-render.


#### Action

An [Action](https://facebook.github.io/flux/docs/in-depth-overview.html#actions)
is created from a user event or from the server (like data being received). They
are simply a payload with a `type`. Based on the `type` of Action, stores will
process the payload and update appropriately.


#### Action Creator

A semantic wrapper function that dispatches actions. In some cases, actions are
related, like requesting data from the server. A request for data might result
in a `fetch` action followed by a `receive` action and possibly an `error`
action if the request failed. Action Creators wrap these Actions together.

Action Creators should always return a `Promise` so that it is easy to chain
them together or wait for async actions to complete.


#### Component

A [View](https://facebook.github.io/flux/docs/in-depth-overview.html#views-and-controller-views)
in Flux terms, the Component is a pure function that renders based on only it's
`props`.

Generally, it should not be necessary for a component to manage state. It should not hold
its own state or deal with any lifecycle hooks. Instead, state changes should be
handled by the event handlers, triggering Actions and state changes in the
Stores. The App will detect these state changes and pass the new props to the
Component.

It is okay to store UI state within components, but if this data becomes
complex, it is usually best to move it into a Store.


#### Page

A single web page that contains one or more Components. It is a special component called
a [Controller-View](https://facebook.github.io/flux/docs/in-depth-overview.html#views-and-controller-views)
in Flux terms and implements the
[Container](https://facebook.github.io/flux/docs/flux-utils.html#container)
interface. It is responsible for initializing the dispatcher and stores. It
wraps the Action Creators in event handlers and passes any state to individual
components on the page.
