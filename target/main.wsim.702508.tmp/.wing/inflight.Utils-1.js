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
  }
  return Utils;
}
