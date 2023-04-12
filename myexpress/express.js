var finalhandler = require("finalhandler");
// 要继承很多库，所以使用mixin。
var mixin = require("merge-descriptors");
var proto = require("./application");

function createApplication() {
  var app = function (req, res) {
    app.handle(req, res);
  };

  app.handle = function handle(req, res) {
    var router = this._router;

    //最终的处理方式
    var done = finalhandler(req, res);

    if (!router) {
      done();
      return;
    }

    // 如果有router就用router处理。
    router.handle(req, res, done);
  };

  mixin(app, proto, false);

  return app;
}

exports = module.exports = createApplication;
