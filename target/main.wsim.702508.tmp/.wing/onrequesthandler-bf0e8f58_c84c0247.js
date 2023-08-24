exports.handler = async function(event) {
  return await (
          (await (async () => {
            const $Closure1Client = 
          require("./inflight.$Closure1-1.js")({
            $auth: 
          (await (async () => {
            const BasicAuthClient = 
          require("./inflight.BasicAuth-1.js")({
            $Utils: 
          require("./inflight.Utils-1.js")({
          })
        ,
            $std_Json: require("/opt/homebrew/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
          })
        ;
            const client = new BasicAuthClient({
              $this_password: "admin",
              $this_user: "admin",
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ).handle(event);
};