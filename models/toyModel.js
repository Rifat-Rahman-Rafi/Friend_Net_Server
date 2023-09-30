// models/toyModel.js
import mongoose from 'mongoose';

const toySchema = new mongoose.Schema({
  toy_name: String,
  category: String,
  price: Number,
  quantity: Number,
  description: String,
  // Add other fields as needed
});


var Toy = mongoose.model('Toy', toySchema);

export default Toy;
