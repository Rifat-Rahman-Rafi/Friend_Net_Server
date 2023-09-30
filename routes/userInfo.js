import express from "express"
import { createuserinfo, followers, getUsersByIds, getalluserinfo, getuserinfo, getusernotifications, updateuserinfo } from "../controllers/userInfo.js"

const userInfoRouter = express.Router()

userInfoRouter.post("/createuserinfo", createuserinfo)
userInfoRouter.get("/getuserinfo/:id", getuserinfo)
userInfoRouter.patch("/updateuserinfo", updateuserinfo)
userInfoRouter.get("/getalluserinfo", getalluserinfo)
userInfoRouter.put("/followers", followers)
userInfoRouter.get("/getusernotifications/:id", getusernotifications)
userInfoRouter.get('/getUsersByIds/:id',getUsersByIds)

export default userInfoRouter