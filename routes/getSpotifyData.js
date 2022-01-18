const { getCurrentOrLastSong } = require("../controllers/getSpotifyData");
const { API_ACCESS_KEY } = require("../configs/environments");
const { verifyApiAccess } = require("../middlewares/verifyApiAccess");

const router = require("express").Router();

// router endpoints
router.get("/getCurrentOrLastSong", verifyApiAccess, getCurrentOrLastSong);

module.exports = router;
