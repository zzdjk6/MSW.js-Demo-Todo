# Better network request mocking with MSW.js

> How to mock REST API in a central place which behaves "real"

## Why mocking?

## Pain points of mocking fetch / axios

## What is MSW.js and why?

## Example with Todo List

### Develop against mock server

### Testing against mock server

## Bonus: folder structure for more complex app

Find things much easier with mimicing the routes to directory paths.

## Bonus: handle dynamic data with in-memory storage

* Filter by API backend (made up requirement)
* Auto-increment ID
* Clean up to isolate each unit / functional tests

// TODO: Find more accurate examples in workstation

## Bonus: One-time overwride

* https://mswjs.io/docs/api/setup-server/use#one-time-override
* https://mswjs.io/docs/recipes/request-assertions

## Bonus: Mock binary response (e.g., Image)

* https://mswjs.io/docs/recipes/binary-response-type

## Gotcha: Service worker can only be used with HTTPS

You can't deploy an HTTP-based demo site for others to play with your mock (localhost is fine)

## Gotcha: url not hijacked by handlers will be passed through by default

Better to block these network requests

https://mswjs.io/docs/api/setup-server/listen#onunhandledrequest

## Discuss: Graphql? Proxy requests to keystonejs might be a better idea

* it is more of an e2e tests then
