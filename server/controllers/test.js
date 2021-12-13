
const express = require("express");

const router = express.Router();
const checkAuth = require('../middleware/auth')

router.get("/test",checkAuth, (req, res) => {
  console.log('reached test')
    res.sendStatus(200)
  });

  module.exports = router;