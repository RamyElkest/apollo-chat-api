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

userSchema.statics.getUser = function getUser() {
  return this.findOne();
};

export default mongoose.model('User', userSchema);
