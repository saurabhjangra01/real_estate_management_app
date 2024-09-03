const express = require("express");
const homeController = require("../controllers/home.controllers");

const router = express.Router();

router.get("/find-by-user/:username", homeController.getHomesByUser);
router.post("/update-users/:street_address", homeController.updateUsersOfHome);

module.exports = router;
