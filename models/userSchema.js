const mongoose = require("mongoose");
const plm=require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  contact: String,
  email: String,
  avatar:{
    type:String,
    default:'default.png',
  },
  links:{
    type:Object,
    default:{
      linkedin:"",
      github:"",
      behance:"",
    },
  },

},
{timestamps:true}
);

userSchema.plugin(plm);
const user = mongoose.model("user", userSchema);

module.exports = user;
