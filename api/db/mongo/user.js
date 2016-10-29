import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  threads: [],
}, {
  timestamps: true,
},
);


export default mongoose.model('User', userSchema);
