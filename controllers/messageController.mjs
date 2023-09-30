// // controllers/messageController.mjs

// // Import the Message model
// import Message from '../models/message.mjs';

// // Controller to handle sending a message
// export const sendMessage = async (req, res) => {
//   try {
//     const { text, user } = req.body;

//     // Create a new message
//     const message = new Message({ text, user });

//     // Save the message to the database
//     await message.save();

//     // Emit the message to all connected clients using Socket.io
//     io.emit('message', message);

//     res.status(201).json(message);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Controller to retrieve all messages
// export const getAllMessages = async (req, res) => {
//   try {
//     // Fetch all messages from the database
//     const messages = await Message.find().sort({ createdAt: 'asc' });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
