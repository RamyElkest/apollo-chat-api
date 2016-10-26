import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  name: String,
  isRead: Boolean,
  messages: []
}, {
  timestamps: true
});


export default mongoose.model('User', userSchema);
