const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  dislikes: [
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
},
{
  toJSON: {virtuals: true}
});

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post"
})

module.exports = mongoose.model('Post', PostSchema);