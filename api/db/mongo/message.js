import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  threadId: { type: String, required: true, index: true },
  content: { type: String, required: true },
  postedBy: { type: String, required: true },
}, {
  timestamps: true,
});

messageSchema.statics.getByThreadId = function getByThreadId(id) {
  return this.find({ threadId: id }).sort('createdAt').exec();
};

export default mongoose.model('Message', messageSchema);
