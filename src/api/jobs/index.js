const express = require("express");
const JobsHandler = require("./handler");

const router = express.Router();

router.get("/", JobsHandler.getAllJobsHandler);
router.get("/:id", JobsHandler.getAllJobsHandler);

module.exports = router;
