/**
 * @description Setup 2 servers serving http and https protocols
 * @description It use the following
 * @description 1. koa as an app server as an alternative to express
 * @description 2. http as the http server
 * @description 3. https as the https server
 * @description 4. koa-sslify to redirect http request to https server
 */

// import Koa from 'koa'
const express = require('express')
import { Nuxt, Builder } from 'nuxt'
const fs = require('fs')
const path = require('path')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')

var app = express()

// for https server
// const https = require('https')
const http2 = require('spdy')

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

/**
 * @description Configuration of servers serving http and https protocol request
 * @description You can change:
 * @description 1. http port 80 to a new valid one
 * @description 2. https port 443 to a new valid one
 * @description 3. Set of valid certificate & key file to create https server (ssl)
 */
const setting = {
  host: 'localhost',
  http: {
    port: process.env.HOST || 80
  },
  https: {
    port: 443,
    options: {
      key: fs.readFileSync(path.resolve(process.cwd(), 'build/certs/server.key')),
      cert: fs.readFileSync(path.resolve(process.cwd(), 'build/certs/server.crt')),
      requestCert: false,
      rejectUnauthorized: false
    }
  }
}

const isDevelopment = !(app.env === 'production')

/**
 * @description Build in development
 */
if (isDevelopment) {
  const builder = new Builder(nuxt)
  builder.build().catch(e => {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
const redirect = express()
redirect.get('*', function(req, res){
  res.redirect('https://' + setting.host + ':' + setting.https.port + req.url)
})
redirect.listen(setting.http.port);
// app.listen(config.http.port, config.host)

// Setup a server to serve https protocol
// https.createServer(setting.https.options, app).listen(setting.https.port)
http2
.createServer(setting.https.options, app)
.listen(setting.https.port, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Listening on port: ' + setting.https.port + '.');
})
