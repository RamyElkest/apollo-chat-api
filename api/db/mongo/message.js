import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  postedBy: String,
  content: String,
  threadId: { type: String, index: true },
}, {
  timestamps: true,
});

messageSchema.statics.getByThreadId = function getByThreadId(id) {
  return this.find({ threadId: id }).exec();
};

export default mongoose.model('Message', messageSchema);
