module.exports = function({ $apiUrl, $http_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(String.raw({ raw: ["", "/hello"] }, $apiUrl)));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 401")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.status,401)))};
    }
  }
  return $Closure3;
}
