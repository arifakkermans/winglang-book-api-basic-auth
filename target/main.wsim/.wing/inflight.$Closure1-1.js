module.exports = function({ $Utils, $auth }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const authenticated = (await $auth.call(req));
      if ((!authenticated)) {
        return ({"status": 401,"headers": ({"Content-Type": "text/plain"}),"body": "Unauthorized"});
      }
      return ({"status": 200,"headers": ({"Content-Type": "text/plain"}),"body": (await $Utils.getBooks())});
    }
  }
  return $Closure1;
}
