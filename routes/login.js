const {
  getAuthorization,
  getAuthorizationCallback,
} = require("../controllers/login");
const { verifyApiAccess } = require("../middlewares/verifyAPIaccess");
const router = require("express").Router();

// router endpoints
router.get("/", verifyApiAccess, getAuthorization);
router.get("/getAuthorizationCallback", getAuthorizationCallback);

module.exports = router;
