const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("hey its auth router")
})

module.exports = router