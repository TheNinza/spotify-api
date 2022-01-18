const axios = require("axios").default;
const {
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CLIENT_ID,
} = require("../configs/environments");

exports.getAuthorization = async (_req, res) => {
  try {
    const scope =
      "user-read-playback-position user-top-read user-read-recently-played user-read-currently-playing";

    const redirect_uri =
      "http://localhost:8000/api/login/getAuthorizationCallback";

    const query = {
      client_id: SPOTIFY_CLIENT_ID,
      response_type: "code",
      redirect_uri,
      scope,
    };
    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");

    const url = `https://accounts.spotify.com/authorize?${queryString}`;

    res.redirect(url);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.getAuthorizationCallback = async (req, res) => {
  try {
    const code = req.query.code || null;

    if (!code) {
      return res.status(400).json({
        message: "Code is missing",
      });
    }

    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append(
      "redirect_uri",
      "http://localhost:8000/api/login/getAuthorizationCallback"
    );

    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      formData,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        json: true,
      }
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
