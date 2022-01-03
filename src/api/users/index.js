const express = require("express");
const UserHandler = require("./handler");

const router = express.Router();

router.post("/login", UserHandler.loginHandler);
router.post("/register", UserHandler.registerHandler);
router.post("/verify", UserHandler.verifyHandler);

module.exports = router;
