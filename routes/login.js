const {
  getAuthorization,
  getAuthorizationCallback,
} = require("../controllers/login");
const router = require("express").Router();

// router endpoints
router.get("/", getAuthorization);
router.get("/getAuthorizationCallback", getAuthorizationCallback);

module.exports = router;
