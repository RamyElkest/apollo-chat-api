import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  postedBy: String,
  content: String,
  threadId: String,
}, {
  timestamps: true,
});


export default mongoose.model('Message', messageSchema);
