const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("hey its user router")
})

module.exports = router