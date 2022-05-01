const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  createDate: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    // connect users
    ref: "users",
  },
});
module.exports = mongoose.model("posts", PostSchema);
