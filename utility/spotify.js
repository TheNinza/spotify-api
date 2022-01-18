const axios = require("axios").default;
const {
  SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CLIENT_ID,
} = require("../configs/environments");

exports.getRefreshedAccessToken = async () => {
  if (!SPOTIFY_REFRESH_TOKEN) {
    throw new Error(
      "SPOTIFY_REFRESH_TOKEN is not defined. Visit /api/login/getAuthorization from a web browser to get a new token."
    );
  }

  const formData = new URLSearchParams();
  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", SPOTIFY_REFRESH_TOKEN);

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    formData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
      },
    }
  );

  return data;
};
