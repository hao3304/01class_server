const path = require("path");
const isDev = think.env === "development";
const jwt = require("koa-jwt");
const cors = require("koa-cors");

module.exports = [
  {
    handle: "meta",
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: "resource",
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, "www"),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: "trace",
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: "payload",
    options: {
      keepExtensions: true,
      limit: "5mb"
    }
  },
  {
    handle: "router",
    options: {}
  },
  {
    handle: cors,
    options: {}
  },
  {
    handle: jwt,
    options: {
      secret: think.config("jwt")["secret"],
      passthrough: true,
      getToken(ctx) {
          return ctx.request.headers['x-auth-token'];
      }
    }
  },
  "logic",
  "controller"
];
