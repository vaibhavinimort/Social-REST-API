const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async(req, res) => {
    const newConversation = new({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);

    } catch (err) {
        res.status(500).json(err)
    }
});

//get conv of user
// router.gert("/:userId",async(req,res)=>{
//     try{

//     }catch(err){
//     res.status(500).json(err);
//     }
// })


module.exports = router;