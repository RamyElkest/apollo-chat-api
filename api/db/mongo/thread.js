import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  name: String,
  readBy: [String],
}, {
  timestamps: true,
});

threadSchema.statics.getById = function getById(id) {
  return this.findOne(id);
};

threadSchema.statics.getByIds = function getByIds(ids) {
  console.log(ids);
  return this.find({ id: { $in: ids } }).exec();
};


export default mongoose.model('Thread', threadSchema);
