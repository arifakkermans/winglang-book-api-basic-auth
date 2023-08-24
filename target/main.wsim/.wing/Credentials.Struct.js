module.exports = function(stdStruct, fromInline) {
  class Credentials {
    static jsonSchema() {
      return {
        id: "/Credentials",
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
        required: [
          "username",
          "password",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return fromInline(`require("./Credentials.Struct.js")(${ context._lift(stdStruct) })`);
    }
  }
  return Credentials;
};
