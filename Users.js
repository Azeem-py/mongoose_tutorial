const mongoose = require('mongoose')

const addressScheme = new mongoose.Schema({
  street: String,
  city: String,
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    maxLength: 30,
  },
  age: {
    type: Number,
    min: 1,
    max: 80,
    validate: {
      validator: (v) => v % 2 === 0,
      message: 'Age is not even',
    },
  },
  email: { type: String, required: true, lowercase: true },
  createAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: addressScheme,
})

module.exports = mongoose.model('User', UserSchema)
