const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.auth.controller.js");

router.post("/register", controller.postRegister);
router.post("/login", controller.postLogin);

module.exports = router;
