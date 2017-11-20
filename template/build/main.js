require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = {
  head: {
    title: 'N2EX',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic' }]
  },
  css: ['~assets/css/main.css', '~assets/font/material-icons.css', 'muse-ui/dist/muse-ui.css', 'muse-ui/dist/theme-carbon.css'],
  loading: {
    color: '#ff4081'
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/component-cache'],
  axios: {
    baseURL: 'https://proxy-oagpwnbkpe.now.sh',
    credentials: false,
    proxyHeaders: false
  },
  plugins: [{ src: '~plugins/muse-ui.js', ssr: true }, '~plugins/filters.js']
};

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("https");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("koa-sslify");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/**
 * @description Setup 2 servers serving http and https protocols
 * @description It use the following
 * @description 1. koa as an app server as an alternative to express
 * @description 2. http as the http server
 * @description 3. https as the https server
 * @description 4. koa-sslify to redirect http request to https server
 */



var fs = __webpack_require__(1);
var path = __webpack_require__(7);

// Import and Set Nuxt.js options
var config = __webpack_require__(0);
var app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();

// for https server
var https = __webpack_require__(3);
// for http server
var http = __webpack_require__(2);
// for forcing/redirecting to ssl
var forceSSL = __webpack_require__(5);

// Instantiate nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

/**
 * @description Configuration of servers serving http and https protocol request
 * @description You can change:
 * @description 1. http port 80 to a new valid one
 * @description 2. https port 443 to a new valid one
 * @description 3. Set of valid certificate & key file to create https server (ssl)
 */
var setting = {
  host: 'localhost',
  http: {
    port: process.env.HOST || 80
  },
  https: {
    port: 443,
    options: {
      key: fs.readFileSync(path.resolve(process.cwd(), 'build/certs/localhost.key'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), 'build/certs/localhost.crt'), 'utf8').toString(),
      requestCert: false,
      rejectUnauthorized: false
    }
  }
};

var isDevelopment = !(app.env === 'production');

/**
 * @description Build in development
 */
if (isDevelopment) {
  var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build().catch(function (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

/**
 * @description T Force SSL on all page.
 * @description Therefore, this will redirect http protocol request
 * @description to https protocol on https://host:portHttps
 */
app.use(forceSSL({
  trustProtoHeader: true,
  port: setting.https.port,
  hostname: setting.host,
  ignoreUrl: false
}));

app.use(function (ctx) {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset

  return new Promise(function (resolve, reject) {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, function (promise) {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

// Setup a server to serve http protocol
http.createServer(app.callback()).listen(setting.http.port);

// Setup a server to serve https protocol
https.createServer(setting.https.options, app.callback()).listen(setting.https.port);

/***/ }
/******/ ]);
//# sourceMappingURL=main.map