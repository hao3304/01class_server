const fileCache = require("think-cache-file");
const nunjucks = require("think-view-nunjucks");
const fileSession = require("think-session-file");
const postgresql = require('think-model-postgresql');
const { Console, File, DateFile } = require("think-logger3");
const path = require("path");
const isDev = think.env === "development";

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: "file",
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, "runtime/cache"), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: "postgresql",
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  postgresql: {
    handle: postgresql, // Adapter handle
    user: 'postgres', // 用户名
    password: 'postgres', // 密码
    database: 'classroom_development', // 数据库
    host: '65.49.214.181', // host
    port: 2345, // 端口
    connectionLimit: 1, // 连接池的连接个数，默认为 1
    prefix: '', // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: "file",
  common: {
    cookie: {
      name: "thinkjs"
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, "runtime/session")
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: "nunjucks",
  common: {
    viewPath: path.join(think.ROOT_PATH, "view"),
    sep: "_",
    extname: ".html"
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? "console" : "dateFile",
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, "logs/app.log")
  },
  dateFile: {
    handle: DateFile,
    level: "ALL",
    absolute: true,
    pattern: "-yyyy-MM-dd",
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, "logs/app.log")
  }
};
