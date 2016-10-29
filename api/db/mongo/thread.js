import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  name: String,
  readBy: [String],
}, {
  timestamps: true,
});


export default mongoose.model('Thread', threadSchema);
