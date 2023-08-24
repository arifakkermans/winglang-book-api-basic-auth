exports.handler = async function(event) {
  return await (
          (await (async () => {
            const $Closure2Client = 
          require("./inflight.$Closure2-1.js")({
            $Utils: 
          require("./inflight.Utils-1.js")({
          })
        ,
          })
        ;
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ).handle(event);
};