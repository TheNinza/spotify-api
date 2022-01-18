const express = require("express");
const cors = require("cors");
const { PRODUCTION_ENV } = require("./configs/environments");

/**
 * Express configuration
 */

const app = express();

// middlewares

app.use(cors());
app.use(express.json());

if (!PRODUCTION_ENV) {
  app.use(require("morgan")("dev"));
}

// endpoints
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api/login", require("./routes/login"));
app.use("/api/getSpotifyData", require("./routes/getSpotifyData"));

// start server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server listening on port ${port} @ ${new Date().toLocaleString()}`
  );
});
