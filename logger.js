// middlewere/logger.js

const loggerMiddleware = (req, res, next) => {
  // 1. Get the current time
  const time = new Date().toLocaleTimeString();

  // 2. Get the HTTP method (GET, POST, PATCH, etc.)
  const method = req.method;

  // 3. Get the requested URL path
  const url = req.url;

  // 4. Print the details to the console
  console.log(`Method: ${method} | URL: ${url} | Time: ${time}`);

  // 5. Move to the next route or middleware
  next();
};

// Export the middleware so app.js can use it
module.exports = { loggerMiddleware };