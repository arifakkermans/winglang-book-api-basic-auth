module.exports = function({ $Utils, $apiUrl, $http_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(String.raw({ raw: ["", "/books"] }, $apiUrl),({"headers": ({"Accept": "application/json","Authorization": ("Basic " + (await $Utils.base64encode("admin:admin")))})})));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.status,200)))};
    }
  }
  return $Closure4;
}
