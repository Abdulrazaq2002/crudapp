import Message from "../schema/messag.schema.js";

export const PostMessage = async (req, res) => {
  try {
    const { name, message, auther } = req.body;
    const newMessage = new Message({
      name,
      message,
      auther,
    });

    if (!newMessage) {
      res
        .status(404)
        .json({ error: "Message Can't Send", message: error.message });
    }
    const data = await newMessage.save();
    res.status(201).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error at post-controller", message: error.message });
  }
};

export const GetMessage = async (req, res) => {
  try {
    const GetMsg = await Message.find();
    if (!GetMsg) {
      res
        .status(404)
        .json({ error: "Error could't get messages", message: error.message });
    }
    // Increment views for each post
    GetMsg.forEach(async (msg) => {
      msg.views = msg.views ? msg.views + 0.5 : 1;
      await msg.save();
    });
    res.json(GetMsg);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error at get-controller", message: error.message });
  }
};
export const GetMessageByUsername = async (req, res) => {
  try {
    const GetMessage = await Message.findOne({ name: req.params.name });
    if (!GetMessage) {
      return res.status(404).json({
        error: "Error could't get messages by name",
        message: "Message not found",
      });
    }
    res.json(GetMessage);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error at get-controller", message: error.message });
  }
};

export const GetByIdMessage = async (req, res) => {
  try {
    const GetById = await Message.findById(req.params.id);
    res.json(GetById);
    if (!GetById) {
      res.status(404).json({
        error: "Error could't get messages by id",
        message: error.message,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error at get-controller", message: error.message });
  }
};
export const EditMessage = async (req, res) => {
  try {
    const EditMsg = await Message.findById(req.params.id);
    if (!EditMsg) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (req.body.name) {
      EditMsg.name = req.body.name;
    }
    if (req.body.message) {
      EditMsg.message = req.body.message;
    }
    if (req.body.auther) {
      EditMsg.auther = req.body.auther;
    }
    const data = await EditMsg.save();
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error at edit-controller", message: error.message });
  }
};
export const DeleteMessage = async (req, res) => {
  try {
    const DeleteMsg = await Message.findById(req.params.id);
    if (!DeleteMsg) {
      return res.status(404).json({ message: "Error at deleting message" });
    }

    const data = await DeleteMsg.deleteOne();
    res.json(DeleteMsg);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error at edit-controller", message: error.message });
  }
};
