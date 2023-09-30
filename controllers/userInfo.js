import userInfo from "../models/userInformation.js";
import post from "../models/posts.js";

export const createuserinfo = async (req, res) => {
  const { profileImg, bio, creator, name, coverImg } = req.body;
  try {
    const updateInfo = new userInfo({
      profileImg,
      bio,
      creator,
      name,
      coverImg
    });
    await updateInfo.save();
    res.status(200).json({ updateInfo, message: "Successfully saved" });
  } catch (error) {
    console.log(error);
  }
};

export const getuserinfo = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const userInfor = await userInfo.findOne({ creator: id });

    if (!userInfor) {
      return res.status(400).json({ message: "No user info found" });
    }
    try {
      return res
        .status(200)
        .json({ userInfor, message: "Successfully gotten user info" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getalluserinfo = async (req, res) => {
  try {
    const {page} = req.query
    console.log(page)
    const LIMIT = 7
    const SKIP = (Number(page) - 1) * LIMIT
    const userInfor = await userInfo.find().sort({_id: -1}).limit(LIMIT).skip(SKIP);

    try {
      return res
        .status(200)
        .json({ userInfor, message: "Successfully gotten all user info" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateuserinfo = async (req, res) => {

  const { profileImg, bio, creator, name, coverImg } = req.body;
  try {
    const updateInfo = await userInfo.updateOne(
      {
        creator: creator,
      },
      {
        $set: {
          profileImg: profileImg,
          bio: bio,
          name: name,
          coverImg: coverImg,
        },
      }
    );
    const updatedUserProfile = await post.updateMany(
      {
        creator: creator,
      },
      {
        $set: {
          profileImg: profileImg,
        },
      }
    );
    //console.log(updatedUserProfile ,"DIHDHD")
    return res
      .status(200)
      .json({ updateInfo, message: "Successfully updated" });
  } catch (error) {}
};

export const followers = async (req, res) => {
  const { follower, followee, follower_name,userInfoid } = req.body;
  // followee finding the all post of that userb which is the followee
  const userbpost = await post.findOne({ creator: followee });
  const userafollowing = await userInfo.findOne({creator: followee});
  console.log(follower, "h")
  try {
    if (userafollowing?.followeeId?.includes(follower)) {
     const updated3 = await userInfo.updateOne(
        { creator: follower },
        {
            $pull: {
              followerId: { $in: [followee] },
              // userpost: userbpost
          },
        }
      );
     const updated4 = await userInfo.updateOne(
        { _id: userInfoid },
        {
            $pull: {
              followeeId: { $in: [follower] },
              follower_name: follower_name,
          },
        }
      );
      console.log("removing");
      return res
        .status(200)
        .json({updated3, updated4, message: "Successfully removed followed user" });
    } else {
     const updated2 = await userInfo.updateOne(
        { creator: follower },
        {
            $addToSet: {
              followerId: followee,
              // userpost:
            },
        }
      );
     const updated = await userInfo.updateOne(
        { creator: followee },
        {
            $addToSet: {
              followeeId: follower,
              follower_name: follower_name,
          },
        }
      );
      await userInfo.updateOne(
        { creator: followee },
        {
          $push: {
            notification: `${follower_name} Followed you`,
          },
        }
      );
      console.log("adding")
      return res.status(200).json({updated, updated2,message2: "Successfully sent notification", message: "Successfully followed user" });
    }
   
  } catch (error) {
    console.log(error);
  }
};

export const getusernotifications = async (req, res) => {
    const {id} = req.params
  try {
    const usernotifications = await userInfo.findOne({creator: id})

    return res.status(200).json({usernotifications, message: "successful"})
  } catch (error) {
    console.log(error)
  }
}




// controllers/userController.js

export const getUsersByIds = async (req, res) => {
  const { id } = req.params;
  const { userIds } = req.query; 


  try {
    // Split the comma-separated string of userIds into an array
    const userIdArray = userIds.split(',');

    // Find users by IDs
    const users = await userInfo.findOne({ creator: id },{followeeId:1});

    console.log("AHBAB");

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users by IDs' });
  }
};

