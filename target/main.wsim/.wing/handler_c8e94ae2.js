exports.handler = async function(event) {
  return await (
          (await (async () => {
            const $Closure4Client = 
          require("./inflight.$Closure4-1.js")({
            $Utils: 
          require("./inflight.Utils-1.js")({
          })
        ,
            $apiUrl: process.env["WING_TOKEN_ROOT_DEFAULT_CLOUD_API_ATTRS_URL"],
            $http_Util: require("/opt/homebrew/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
          })
        ;
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ).handle(event);
};