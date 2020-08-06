// these functions aren't strictly necessary
// we could inline all the HTML into big strings inside our handlers, but that would get hard to read
// it's a good idea for functions to have one responsibility
// so these templates handle the HTML rendering and leave the logic to the handlers

// sharedLayout wraps an HTML string in all the extra stuff you need, like the <head>
function sharedLayout(content) {
  return `
    <!doctype html>
    <html>
      <head>
      <meta charset="utf-8">
      <title>Greeting app</title>
      <!-- you'd probably put a proper <link href="styles.css"> here in a real app -->
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
        }
      </style>
      <body>
        ${content}
      </body>
    </html>
  `;
}

// the HTML response for the home route (not dynamic so no arguments passed in)
function home() {
  return sharedLayout(`
    <h1>Greeting App</h1>
    <form action="/submit" method="POST">
      <label for="name">What's your name?</label>
      <input id="name" name="name">
      <button type="submit">Submit</button>
    </form>
  `);
}

// the HTML response for the submit route (relies on user-submitted data, which we pass as the `name` argument)
function submit(name) {
  return sharedLayout(`
    <h1>Hello ${name}</h1>
  `);
}

// the default HTML response if we don't match any urls in the router
function missing() {
  return sharedLayout(`
    <h1>Not found, sorry!</h1>
  `);
}

module.exports = { home, submit, missing };
