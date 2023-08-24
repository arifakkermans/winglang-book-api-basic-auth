module.exports = function({ $Utils }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      if ((await $Utils.bookExists((await $Utils.getISBNFromPath(req.path))))) {
        return ({"status": 201,"body": (await $Utils.getBookByISBN((await $Utils.getISBNFromPath(req.path))))});
      }
      else {
        return ({"status": 201,"body": "Book not found"});
      }
    }
  }
  return $Closure2;
}
