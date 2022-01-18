require("dotenv").config();

module.exports = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  API_ACCESS_KEY: process.env.API_ACCESS_KEY,
};
