const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.get("/find-all", userController.getAllUsers);
router.get("/find-by-home/:street_address", userController.getUsersByHome);

module.exports = router;
