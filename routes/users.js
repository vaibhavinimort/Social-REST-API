const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update  user
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            console.log("id", req.params.id)
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("accpount has been updated")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can update only your account!")
    }
});


//delete user
router.delete("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            console.log("id", req.params.id)
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json("your account has been deleted")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can delete only your account!")
    }
});

//get a user
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, upadatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err)
    }
});

//follow user
router.put("/:id/follow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            //already following user in db
            const user = await User.findById(req.params.id);
            //login user requested to follower
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pill: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.body.userId } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you already follow this user")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you cant follow yourself")
    }
})

//unfollow user
router.put("/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            //already following user in db
            const user = await User.findById(req.params.id);
            //login user requested to follower
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.body.userId } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you cant unfollow yourself")
    }
})
module.exports = router;