const mongoose = require('mongoose')
const User = require('./Users')

mongoose.connect('mongodb://localhost/testdb')

const run = async () => {
  //we can create a new user with this method
  // const user = new User({ name: 'John', age: 18 })
  // await user.save()

  //METHOD 2

  try {
    const user = await User.create({
      name: 'Kareem',
      age: 25,
      hobbies: ['Bowling', 'Soccer'],
      address: { street: 'St Lois', city: 'Lagos' },
      email: 'mandem@test.COM',
    })

    //a user can also be updated like this

    // user.name = 'Fawaz'
    await user.save()
    console.log(user)
  } catch (error) {
    console.log(error.message)
  }
}

run()
