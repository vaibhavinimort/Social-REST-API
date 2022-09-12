   const mongoose = require("mongoose")

   const userSchema = new mongoose.Schema({
       username: {
           type: String,
           require: true,
           min: 3,
           max: 20,
           unique: true
       },
       email: {
           type: String,
           required: true,
           min: 6
       },
       password: {
           type: String,
           required: true,
           min: 6
       },
       profilePicture: {
           type: String,
           default: ""
       },
       coverPicture: {
           type: String,
           default: ""
       },
       followers: {
           type: Array,
           default: ""
       },
       followins: {
           type: Array,
           default: []
       },
       isadmin: {
           type: Boolean,
           default: false,
       },
   }, { timestamp: true });


   module.exports = mongoose.model("User", userSchema);