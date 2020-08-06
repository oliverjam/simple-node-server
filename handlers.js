const templates = require("./templates");

// all the handler functions are responsible for a single route
// they "handle" any data/logic required to send a response
// then they call the correct template to get the HTML to send to the browser

function home(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  // we could hard-code the HTML in a string here, but it gets pretty long
  // easier to put it all inside a function we can re-use
  const html = templates.home();
  response.end(html);
}

function submit(request, response) {
  // our handler runs before the entire request has finished
  // so we need to listen for "data" events to get hold of every chunk of our request body
  // we build up the body string each time we get a new chunk of the data
  let body = "";
  request.on("data", (chunkOfData) => {
    body += chunkOfData;
  });

  // the "end" event runs the arrow function we pass once the entire request is finished
  // this means we have the whole body and can send a response
  request.on("end", () => {
    // the body submitted by a form is url-encoded like "?name=oli" so we need to parse this
    // so we can get the `name` value to insert it into the HTML string
    const data = new URLSearchParams(body);
    const name = data.get("name");

    response.writeHead(200, { "content-type": "text/html" });
    response.end(`<h1>Hello ${name}</h1>`);
  });

  // if something goes wrong with the body stream need to make sure we still send a response
  // otherwise the browser will just hang for ages waiting
  // 500 status code means "Server error"
  response.on("error", (error) => {
    console.log(error);
    response.writeHead(500, { "content-type": "text/html" });
    const html = `<h1>Wow that's really broken huh</h1>`;
    response.end();
  });
}

function missing(request, response) {
  response.writeHead(404, { "content-type": "text/html" });
  const html = templates.missing();
  response.end(html);
}

// make sure we export an object containing all the handlers
// that way we can import them in our router
module.exports = { home, submit, missing };
