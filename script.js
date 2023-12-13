const mongoose = require('mongoose')
const User = require('./Users')

mongoose.connect('mongodb://localhost/testdb')

const run = async () => {
  try {
    // const user = await User.findById('65797692396b61805fe99bee')
    const user = await User.where('name')
      .equals('Kareem')
      .where('age')
      .equals(26)
      .populate('bestFriend')
      .limit(1)
    // const userUpdate = user[0]
    // userUpdate.bestFriend = '657974949d99c68853a5ca55'
    // await userUpdate.save()
    console.log(user)
  } catch (error) {
    console.log(error.message)
  }
}

run()
