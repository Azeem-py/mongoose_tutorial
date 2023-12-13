const mongoose = require('mongoose')
const User = require('./Users')

mongoose.connect('mongodb://localhost/testdb')

const run = async () => {
  try {
    const user = await User.findOne({ name: 'Kareem' })
    user.name = 'David'
    await user.save()
    console.log(user)
  } catch (error) {
    console.log(error.message)
  }
}

run()
