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
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  hobbies: [String],
  address: addressScheme,
})

//methods / virtuals

//NOTE: You must use function() and not arrow function because you're going to be pointing to objects using this

UserSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.name}`)
}

// this is a static method because it can be use direacty on the schema
UserSchema.statics.findByName = function (name) {
  //makes the query case insensitive
  return this.find({ name: new RegExp(name, 'i') })
}

// this is a query method because it can only be used after a query
UserSchema.query.byName = function (name) {
  //makes the query case insensitive
  return this.where({ name: new RegExp(name, 'i') })
}

// virtuals are used to get some basic things done without having to save duplicate data on the db
UserSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}>`
})

//MIDDLEWARES

//using pre() will cause this middleware to run before saving
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  // the next() is for passing to the next middleware just like in express js
  // next()

  // this will throw an error with msg save failed because we are not calling next() thus update won't be saved

  throw new Error('save failed')
})

// using post will make this middleware run after saving
UserSchema.post('save', function (doc, next) {
  //the doc param here is to reference the the document being returned and call it's sayHi method
  doc.sayHi
  next()
})

module.exports = mongoose.model('User', UserSchema)
