import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: String,
  firstName: String,
  lastName: String,
  threads: [],
}, {
  timestamps: true,
});


export default mongoose.model('User', userSchema);
