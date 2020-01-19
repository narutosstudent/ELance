const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
},
 {
   toJSON: {virtuals: true}
 });

 UserSchema.virtual("posts", {
   ref: "Post",
   localField: "_id",
   foreignField: "user"
 })

module.exports = mongoose.model('User', UserSchema);