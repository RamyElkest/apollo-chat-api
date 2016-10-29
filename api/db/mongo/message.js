import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  postedBy: String,
  content: String,
  threadId: { type: String, index: true },
}, {
  timestamps: true,
});


export default mongoose.model('Message', messageSchema);
