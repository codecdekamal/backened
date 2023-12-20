const express = require("express");
const router = express.Router();
const {gettingUserDetail,edittingProfileInfo} = require("../controllers/User")
router.route("/:id").get(gettingUserDetail).patch(edittingProfileInfo);
module.exports = router