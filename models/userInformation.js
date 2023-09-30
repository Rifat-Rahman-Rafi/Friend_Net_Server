import mongoose from "mongoose";

const userInfoScehma = mongoose.Schema({
  profileImg: {
    type: String,
  },
  bio: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  creator: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  followeeId: { type: [String], default: [] },
  follower_name: { type: [String], default: [] },
  followerId: { type: [String], default: [] },
  userpost: { type: [String], default: [] },
  notification: {
    type: [String],
    default: [],
  },
});

var userInfo = mongoose.model("userInfo", userInfoScehma);

export default userInfo;
