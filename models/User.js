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

   });


   module.export = mongoose.model("User", userSchema);