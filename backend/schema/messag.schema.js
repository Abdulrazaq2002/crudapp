import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  auther: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number, // Field to track the number of views
    default: 0, // Default value is set to 0
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
