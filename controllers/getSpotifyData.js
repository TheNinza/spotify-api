const { getRefreshedAccessToken } = require("../utility/spotify");
const axios = require("axios").default;

exports.getCurrentOrLastSong = async (_req, res) => {
  try {
    const { access_token } = await getRefreshedAccessToken();

    // getting currently playing song

    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing?market=IN&additional_types=track",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (data) {
      return res.status(200).json({
        spotifyData: data,
      });
    }

    // getting last played song

    const { data: data2 } = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=1&market=IN`,

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (data2) {
      return res.status(200).json({
        spotifyData: data2.items[0],
      });
    }

    res.status(200).json({
      message: "No data found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
