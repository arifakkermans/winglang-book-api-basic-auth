module.exports = function({  }) {
  class Utils {
    constructor({  }) {
    }
    static async base64decode(value) {
      return (require("/Users/arifakkermans/personal-repositories/winglang-api-basic-auth/./utils.js")["base64decode"])(value)
    }
    static async base64encode(value) {
      return (require("/Users/arifakkermans/personal-repositories/winglang-api-basic-auth/./utils.js")["base64encode"])(value)
    }
    static async getBooks() {
      return (require("/Users/arifakkermans/personal-repositories/winglang-api-basic-auth/./utils.js")["getBooks"])()
    }
    static async getISBNFromPath(path) {
      return (require("/Users/arifakkermans/personal-repositories/winglang-api-basic-auth/./utils.js")["getISBNFromPath"])(path)
    }
    static async bookExists(isbn) {
      return (require("/Users/arifakkermans/personal-repositories/winglang-api-basic-auth/./utils.js")["bookExists"])(isbn)
    }
    static async getBookByISBN(isbn) {
      return (require("/Users/arifakkermans/personal-repositories/winglang-api-basic-auth/./utils.js")["getBookByISBN"])(isbn)
    }
  }
  return Utils;
}
