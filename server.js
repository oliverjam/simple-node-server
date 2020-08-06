const http = require("http");
const router = require("./router");

// when we deploy to somewhere like Heroku our server will be assigned a random port
// so we can't hard-code it: we need to read whatever port it provides as an environment variable
const PORT = process.env.PORT || 3000;

// tell Node to run our router function whenever it receives a request from a browser
const server = http.createServer(router);

// start the server listening for requests
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
