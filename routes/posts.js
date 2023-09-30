import express from "express";
const router = express.Router();

import { comments, createpost, deletepost, getposts, getUserpost, likepost, updatepost,deletecomment } from "../controllers/posts.js";

router.post("/", createpost);
router.get("/", getposts);
router.patch("/updatepost/:postid", updatepost);
router.get("/userProfile/:id", getUserpost);
router.patch("/likepost/:id/:userId", likepost);
router.post("/comments", comments);
router.delete("/deletepost/:_id", deletepost);
 router.delete("/comments/:_id", deletecomment);
// router.delete('/deletecomment/:_id',deletecomment);
// router.patch('/updatecomment/:_id',updatecomment);
export default router;
