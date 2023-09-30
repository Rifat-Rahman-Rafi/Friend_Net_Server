import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/posts.js";
import userInfo from "../models/userInformation.js";

export const getposts = async (req, res) => {
  try {
    // const {page} = req.query
    // console.log("PAGE",page)
    // const LIMIT = 11
    // const SKIP = (Number(page) - 1) * LIMIT
    // const postMessages = await PostMessage.aggregate(
    //   [
    //     {$sample: {size: 50}}
    //   ]
    // );
    const postMessages = await PostMessage.find().sort({_id: -1})
    return res.status(200).json({ postMessages });
  } catch (error) {
    res.status(404).json({ postDetails: error.postDetails });
  }
};

export const createpost = async (req, res) => {
  const { postDetails, selectedFile, name, creator, profileImg } = req.body;

  const postMessages = new PostMessage({
    postDetails,
    selectedFile,
    name,
    creator,
    profileImg,
  });

  try {
    await postMessages.save();

    res.status(201).json({postMessages});
  } catch (error) {
    res.status(404).json({ postDetails: error.postDetails });
  }
};



export const getUserpost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const PostbyUser = await PostMessage.find({ creator: id });
    res.status(200).json({ PostbyUser });
  } catch (error) {
    console.log(error);
  }
};



export const updatepost = async (req, res) => {
  const { postid } = req.params;
  const { title, selectedFile } = req.body;

  try {
    const updatesuccess = await PostMessage.updateOne(
      { _id: postid },
      {
        $set: {
          postDetails: title,
          selectedFile: selectedFile, // Update the selectedFile
        },
      }
    );

    res.status(200).json({ postDetails: "successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};





export const likepost = async (req, res) => {
  const { id, userId, creator, name } = req.params;
  console.log(id);
  console.log(userId);
  try {

    const user = await PostMessage.findOne(
      { _id: id, likes: userId },
    );

    if (user) {
      const updatedpost2 = await PostMessage.updateOne(
        { _id: id },
        {
          $pull: {
            likes: { $in: [userId] },
          },
        }
      );
      await userInfo.updateOne(
        {creator: creator },
        {
          $push: {
            notification: `${name} liked your post`
          }
        }
      )
      
      console.log("de");
    res.status(200).json({ postDetails: "sucessfully reacted" });

    } else {
      const updatedpost = await PostMessage.updateOne(
        { _id: id },
        {
          $addToSet: {
            likes: userId,
          },
        }
      );

      res.status(200).json({ postDetails: "sucessfully reacted"});

    }

  } catch (error) {
    console.log(error);
  }
};



export const comments = async (req, res) => {
  const { id, comment,name } = req.body;
  console.log(id);
  console.log(comment);
  try {
    const updatedcomments = await PostMessage.updateOne(
      { _id: id },
      {
        $push: {
          comments: `${name}: ${comment}`,
        },
      }
    );
    res.status(200).json({ updatedcomments, postDetails: "sucessfully commented" });
  } catch (error) {
    console.log(error);
  }
};





// Update a comment by ID
//router.patch('/updatecomment/:id',

// export const updatecomment= async(req, res) => {
//   const { _id } = req.params;
//   const { updatedComment } = req.body;

//   try {
//     const post = await PostMessage.findById(_id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const { comments } = post;

//     const commentIndex = comments.findIndex((comment) => comment.startsWith(req.user.name));
    
//     if (commentIndex === -1) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     comments[commentIndex] = `${req.user.name}: ${updatedComment}`;

//     await post.save();

//     return res.status(200).json({ message: 'Comment updated successfully', updatedComment });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };






//router.delete('/deletecomment/:id',
// export const deletecomment= async (req, res) => {
//   const { _id } = req.params;

//   try {
//     const post = await PostMessage.findById(_id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const { comments } = post;

//     const commentIndex = comments.findIndex((comment) => comment.startsWith(req.user.name));
    
//     if (commentIndex === -1) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     comments.splice(commentIndex, 1);

//     await post.save();

//     return res.status(200).json({ message: 'Comment deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };



export const deletecomment = async (req, res) => {

  // const [commentUserName, commentText] = comment.split(': ');

  const { _id  } = req.body;

  try {
    const post = await PostMessage.findById({_id : _id});

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the index of the comment in the comments array
    const commentIndex = post.comments.findIndex((comment) => {
      const [commentUserName, commentText] = comment.split(': ');
      return commentUserName === userName && commentText === commentText;
    });

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};






export const deletepost = async (req, res) => {
      const {_id} = req.params
      console.log(_id)
  try {
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({postDetails: "cant find post"})
    
    const updateddpost = await PostMessage.deleteOne({_id: _id})

    return res.status(200).json({postDetails: "Deleted successfully"})
  } catch (error) {
    console.log(error)
  }
}