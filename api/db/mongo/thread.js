import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  readBy: [String],
}, {
  timestamps: true,
});

threadSchema.statics.getById = function getById(id) {
  return this.findOne({ id }).exec();
};

threadSchema.statics.getByIds = function getByIds(ids) {
  return this.find({ id: { $in: ids } }).exec();
};


export default mongoose.model('Thread', threadSchema);
