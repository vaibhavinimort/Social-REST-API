const router = require("express").Router();
const { posts } = require('../mock');

router.get("/", (req, res) => {
    res.status(200).json(posts);
})

module.exports = router