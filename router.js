const handlers = require("./handlers");

function router(request, response) {
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    handlers.home(request, response);
  } else if (url === "/submit" && method === "POST") {
    handlers.submit(request, response);
  } else {
    handlers.missing(request, response);
  }
}

module.exports = router;
