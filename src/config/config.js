// default config
module.exports = {
  workers: 1,
  errnoField: "code", // errno field
  errmsgField: "message", // errmsg field
  jwt: {
    secret: "jack-password",
    cookie: "x-auth-token",
    expire: 3600 * 24 // 秒
  }
};
