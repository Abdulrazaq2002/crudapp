import express from "express";
import {
  DeleteMessage,
  EditMessage,
  GetByIdMessage,
  GetMessage,
  GetMessageByUsername,
  PostMessage,
} from "../controller/post.controller.js";

const router = express.Router();

router.get("/", GetMessage);
router.get("/:username", GetMessageByUsername);
router.get("/:id", GetByIdMessage);
router.post("/", PostMessage);
router.patch("/:id", EditMessage);
router.delete("/:id", DeleteMessage);
export default router;
