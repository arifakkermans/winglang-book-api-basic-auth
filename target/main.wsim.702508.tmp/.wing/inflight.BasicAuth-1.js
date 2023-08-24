module.exports = function({ $Utils, $std_Json }) {
  class BasicAuth {
    constructor({ $this_password, $this_user }) {
      this.$this_password = $this_password;
      this.$this_user = $this_user;
    }
    async call(req) {
      try {
        const authHeader = (await this.authHeader(req.headers));
        const credentials = (await this.authCredentials(authHeader));
        const username = credentials.username;
        const password = credentials.password;
        return ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(username,this.$this_user)) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(password,this.$this_password)));
      }
      catch {
        {console.log("exception caught - no auth header")};
        return false;
      }
    }
    async authCredentials(header) {
      const auth = (await $Utils.base64decode((await (await header.split(" ")).at(1))));
      const splittedAuth = (await auth.split(":"));
      const username = (await splittedAuth.at(0));
      const password = (await splittedAuth.at(1));
      return ({"username": username,"password": password});
    }
    async authHeader(headers) {
      if ((await this.authHeaderPresent(headers))) {
        const authHeaderOptional = (headers)["authorization"];
        let authHeader = (headers)["Authorization"];
        if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(authHeader,undefined))) {
          authHeader = authHeaderOptional;
        }
        return String.raw({ raw: ["", ""] }, authHeader);
      }
      else {
        {console.log(String.raw({ raw: ["headers: ", ""] }, ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([headers])))};
        {console.log("no auth header")};
        {((msg) => {throw new Error(msg)})("no auth header")};
      }
    }
    async authHeaderPresent(headers) {
      if (((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("authorization" in (headers)),false)) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("Authorization" in (headers)),false)))) {
        return false;
      }
      return true;
    }
  }
  return BasicAuth;
}
