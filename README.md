# rabbitMQ - Bank Slip

A simple example of rabbitMQ with Node.

## Install and Run

Make sure you have Node and Docker installed.

Run rabbitMQ container:

```sh
  docker-compose up
```

Install Node dependencies:

```sh
  yarn install
```

First, run receive.js file:

```sh
  node ./receive.js
```

Then, run the send.js file:

```sh
  node ./send.js
```
