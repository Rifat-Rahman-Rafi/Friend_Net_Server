import mongoose from 'mongoose';
import moment from 'moment-timezone';
const bdTimezone = 'Asia/Dhaka';
//const currentBdTime = new Date(Date.now() + bdTimeOffset +6);
const currentBdTime = moment().tz(bdTimezone).format('YYYY-MM-DD hh:mm:ss A');
const utcTime = currentBdTime;
const bdTimezoneOffset = 6 * 60; // 6 hours * 60 minutes/hour

// Parse the UTC time string into a JavaScript Date object
const utcDate = new Date(utcTime);

// Apply the Bangladesh timezone offset
const bdTime = new Date(utcDate.getTime() + bdTimezoneOffset * 60000);

// Format the Bangladesh time as a 12-hour time with AM/PM
const formattedBdTime = bdTime.toLocaleString("en-US", {
  timeZone: "Asia/Dhaka",
  hour12: true,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const postSchema = mongoose.Schema({
    postDetails: String,
    name: String,
    selectedFile: String,
    creator: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        // profileImg:[String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: formattedBdTime, 
    },
    profileImg: {
        type:String
    }
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;