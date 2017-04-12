# Thought Wall

Thought Wall is a nearly useless application created mainly as playground for Angular 2.

  * A public wall where a list of messages are rendered.
  * Only registered users can publish new messages.
  * On Registration users receive a welcome email.


On its current state the app is far from perfect. Front end glitches are likely to found and the practices in
the code are unlikley considered universally best. But it's my intention to continue improving this project
and using it as an experimental seed.

## Infrastructure, tooling, etc..

[Webpack](https://webpack.js.org/) is used for processing and bundling the Typescript files. So far, none of the other assets are pre-processed.

[Mailgun](https://www.mailgun.com/) API is consumed in order to dispatch emails from the application, so an API KEY for this service will be required. Probably the most annoying part of setting up.

The project uses [nedb](https://github.com/louischatriot/nedb) for in-memory storage. This could be a bit annoying depending on your development process. Yet this shouldn't be a problem for a server that won't be constantly reset.

Lastly the backend is a prett straight forward [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/) web API.

## Setting up

It all starts by cloning this repository. I'd recommend the following sections are followed, dealt with, in order.

### Environment Variables

`APP_SECRET_HASH` This can be set to any string, actually. This is used as the secret for hashing the session.

The rest are very specific mailgun keys.

`MAILGUN_DOMAIN`
`MAILGUN_PUBLIC_KEY`
`MAILGUN_SECRET_KEY`

Needless to say the app support loading these variables from a .env file, this makes it easier to deal with.

### Installing dependencies

`npm install` should be more than enough.

### Processing and packing Typescript files

`webpack` or `webpack --watch` when actively developing.

### Running the tests

The backend is tested to a great extend since it was done mostly test driven. Running the specs
in this stage would most certainly give you a good idea if everything is ready to be started.

`npm test` is enough to run all specs.

### Starting up the server

`npm start`