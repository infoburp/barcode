// include dependencies
var express = require("express");
var proxy = require("http-proxy-middleware");
var path = require("path");

// proxy middleware options
var options = {
  target: "https://api.upcitemdb.com", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  /*pathRewrite: {
            '^/api/old-path' : '/api/new-path',     // rewrite path
            '^/api/remove/path' : '/path'           // remove base path
        },*/
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "http://localhost:3000": "http://localhost:4200"
  }
};

// create the proxy (without context)
var exampleProxy = proxy(options);

// mount `exampleProxy` in web server
var app = express();
app.use("/prod", exampleProxy);
app.use(express.static(path.join(__dirname, "dist")));
app.listen(3000);

/*var express = require("express");
var proxy = require("http-proxy-middleware");

var app = express();

app.use("/", proxy({ target: "http://localhost:4200", changeOrigin: true }));
app.use(
  "/prod",
  proxy({ target: "https://api.upcitemdb.com", changeOrigin: true })
);

app.listen(3000);*/
