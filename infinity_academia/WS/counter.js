const mongoose = require('mongoose');
const Counter = require('./counter');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  nome: String,
  email: String
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'user_id' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;