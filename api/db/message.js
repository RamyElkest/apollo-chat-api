import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  postedBy: String,
  content: String
}, {
  timestamps: true,
});


export default mongoose.model('Message', messageSchema);
