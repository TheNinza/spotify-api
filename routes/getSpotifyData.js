const { getCurrentOrLastSong } = require("../controllers/getSpotifyData");

const router = require("express").Router();

// router endpoints
router.get("/getCurrentOrLastSong", getCurrentOrLastSong);

module.exports = router;
