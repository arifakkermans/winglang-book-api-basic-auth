bring cloud;
bring util;
bring http;
bring ex;

class Utils {
  extern "./utils.js" static inflight base64decode(value: str): str;
  extern "./utils.js" static inflight base64encode(value: str): str;

  init() { }
}

// our books database
let db = new ex.Table(
  name: "books",
  primaryKey: "isbn",
  columns: {
    "isbn" => ex.ColumnType.STRING,
    "title" => ex.ColumnType.STRING,
    "subtitle" => ex.ColumnType.STRING,
    "author" => ex.ColumnType.STRING,
    "published" => ex.ColumnType.STRING,
    "publisher" => ex.ColumnType.STRING,
    "pages" => ex.ColumnType.NUMBER,
    "description" => ex.ColumnType.STRING,
    "website" => ex.ColumnType.STRING,
  }
);


struct Credentials {
  username: str;
  password: str;
}

class BasicAuth {
  user: str;
  password: str;

  init(user: str?, password: str?) {
    this.user = user ?? "admin";
    this.password = password ?? "admin";
  }

  inflight call(req: cloud.ApiRequest): bool {
    try {
      let authHeader = this.authHeader(req.headers);
      let credentials = this.authCredentials(authHeader);
      let username = credentials.username;
      let password = credentials.password;
      return username == this.user && password == this.password;
    } catch {
      log("exception caught - no auth header");
      return false;
    }
  }

  private inflight authCredentials(header: str): Credentials {
    let auth = Utils.base64decode(header.split(" ").at(1));
    let splittedAuth = auth.split(":");
    let username = splittedAuth.at(0);
    let password = splittedAuth.at(1);

    return Credentials {
      username: username,
      password: password
    };
  }
  // workaround for https://github.com/winglang/wing/issues/3205
  private inflight authHeader(headers: Map<str>?): str {
    if (this.authHeaderPresent(headers)) {
      let authHeaderOptional = headers?.get("authorization");
      let var authHeader = headers?.get("Authorization");

      if (authHeader == nil) {
        authHeader = authHeaderOptional;
      }

      // force cast to str from str?
      return "${authHeader}";
    } else {
      log("headers: ${Json.stringify(headers)}");
      log("no auth header");
      throw("no auth header");
    }
  }

  // workaround for https://github.com/winglang/wing/issues/3205
  private inflight authHeaderPresent(headers: Map<str>?): bool {
    if (headers?.has("authorization") == false) && (headers?.has("Authorization") == false) {
      return false;
    }
    return true;
  }
}

let auth = new BasicAuth();
let api = new cloud.Api();

api.get("/books", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {

  let result = MutJson [];
  let var i = 0;
  for book in db.list() {
    result.setAt(i, book);
    i = i + 1;
  }

  let authenticated = auth.call(request);
  if (!authenticated) {
    return {
      status: 401,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Unauthorized"
    };
  }

  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(result)
  };
});

api.get("/books/{isbn}", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let book = db.get(request.vars.get("isbn"));

  let authenticated = auth.call(request);
  if (!authenticated) {
    return {
      status: 401,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Unauthorized"
    };
  }

  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(book)
  };
});

api.post("/books", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let authenticated = auth.call(request);
  if (!authenticated) {
    return {
      status: 401,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Unauthorized"
    };
  }

  if let body = request.body {
    let bookData = Json.parse(body);
    let isbn = bookData.get("isbn");
    db.insert(str.fromJson(isbn), bookData);
    return cloud.ApiResponse {
      status: 201,
      body: str.fromJson(isbn)
    };
   }
});

api.put("/books/{isbn}", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let authenticated = auth.call(request);
  if (!authenticated) {
    return {
      status: 401,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Unauthorized"
    };
  }

  if let body = request.body {
    let bookData = Json.parse(body);
    let isbn = request.vars.get("isbn");
    db.update(isbn, bookData);
    return cloud.ApiResponse {
      status: 200,
      body: Json.stringify(bookData)
    };
  }
});

api.delete("/books/{isbn}", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let authenticated = auth.call(request);
  if (!authenticated) {
    return {
      status: 401,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Unauthorized"
    };
  }

  let id = request.vars.get("isbn");
  db.delete(id);
  return cloud.ApiResponse {
    status: 204
  };
});

test "Not authenticated" {
  let response = http.get("${api.url}/books");
  assert(response.status == 401);
}

test "Authenticated" {
  let response = http.get("${api.url}/books", {
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + Utils.base64encode("admin:admin")
    }
  });

  assert(response.status == 200);
}

test "Post book" {
  let response = http.post("${api.url}/books", {
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + Utils.base64encode("admin:admin")
    },
    body: Json.stringify(  {
      "isbn":"9781593279509",
      "title":"Eloquent JavaScript, Third Edition",
      "subtitle":"A Modern Introduction to Programming",
      "author":"Marijn Haverbeke",
      "published":"2018-12-04T00:00:00.000Z",
      "publisher":"No Starch Press",
      "pages":472,
      "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
      "website":"http://eloquentjavascript.net/"
  })
  });

  assert(response.body == "9781593279509");
  assert(response.status == 201);
}