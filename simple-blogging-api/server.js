require("./data/mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const postRouter = require("./routes/postRouter");

const app = express();

app.use(bodyParser.json());

app.use("/api/posts", postRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
