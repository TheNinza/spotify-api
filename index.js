const express = require("express");
const cors = require("cors");
const { API_ACCESS_KEY } = require("./configs/environments");

/**
 * Express configuration
 */

const app = express();

// middlewares

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer <token>
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token !== API_ACCESS_KEY) {
        throw new Error("Invalid API key");
      } else {
        next();
      }
    } else {
      throw new Error("Invalid API key");
    }
  } catch (error) {
    res.status(401).json({
      message: "Invalid API key",
    });
  }
});

// endpoints
app.get("/", (req, res) => {
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
