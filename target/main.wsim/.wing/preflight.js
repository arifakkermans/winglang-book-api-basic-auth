const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Utils extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("base64decode", "base64encode", "getBooks", "getISBNFromPath", "bookExists", "getBookByISBN", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Utils-1.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const UtilsClient = ${Utils._toInflightType(this).text};
            const client = new UtilsClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class BasicAuth extends $stdlib.std.Resource {
      constructor(scope, id, user, password) {
        super(scope, id);
        this._addInflightOps("call", "authCredentials", "authHeader", "authHeaderPresent", "$inflight_init");
        this.user = (user ?? "admin");
        this.password = (password ?? "admin");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.BasicAuth-1.js")({
            $Utils: ${context._lift(Utils)},
            $std_Json: ${context._lift(std.Json)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BasicAuthClient = ${BasicAuth._toInflightType(this).text};
            const client = new BasicAuthClient({
              $this_password: ${this._lift(this.password)},
              $this_user: ${this._lift(this.user)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          BasicAuth._registerBindObject(this.password, host, []);
          BasicAuth._registerBindObject(this.user, host, []);
        }
        if (ops.includes("authCredentials")) {
          BasicAuth._registerBindObject(Utils, host, ["base64decode"]);
        }
        if (ops.includes("authHeader")) {
          BasicAuth._registerBindObject(this, host, ["authHeaderPresent"]);
        }
        if (ops.includes("call")) {
          BasicAuth._registerBindObject(this.password, host, []);
          BasicAuth._registerBindObject(this.user, host, []);
          BasicAuth._registerBindObject(this, host, ["authCredentials", "authHeader"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-1.js")({
            $Utils: ${context._lift(Utils)},
            $auth: ${context._lift(auth)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(Utils, host, ["getBooks"]);
          $Closure1._registerBindObject(auth, host, ["call"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2-1.js")({
            $Utils: ${context._lift(Utils)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(Utils, host, ["bookExists", "getBookByISBN", "getISBNFromPath"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3-1.js")({
            $apiUrl: ${context._lift(apiUrl)},
            $http_Util: ${context._lift(http.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(apiUrl, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4-1.js")({
            $Utils: ${context._lift(Utils)},
            $apiUrl: ${context._lift(apiUrl)},
            $http_Util: ${context._lift(http.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(Utils, host, ["base64encode"]);
          $Closure4._registerBindObject(apiUrl, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const Credentials = require("./Credentials.Struct.js")($stdlib.std.Struct, $stdlib.core.NodeJsCode.fromInline);
    const auth = new BasicAuth(this,"BasicAuth");
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    (api.get("/books",new $Closure1(this,"$Closure1")));
    (api.get("/books/{isbn}",new $Closure2(this,"$Closure2")));
    const apiUrl = api.url;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:not authenticated",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:authenticated",new $Closure4(this,"$Closure4"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
