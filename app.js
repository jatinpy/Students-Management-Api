const express = require("express");
const app = express();

const { studentrouter } = require("./routes/studentroute");
const { loggerMiddleware } = require("./middlewere/logger");

const PORT = 8080;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/student", studentrouter);

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});