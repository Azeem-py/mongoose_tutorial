const mongoose = require('mongoose')
const User = require('./Users')

mongoose.connect('mongodb://localhost/testdb')

const run = async () => {
  try {
    //this is a static method and can be used directly with the Schema/model e.g
    // const user = await User.findByName('Kyle')

    //this is a query method and can be used after other query e.g
    // const user = await User.find().byName('Kareem')

    const user = await User.findOne({ name: 'Kareem' })
    console.log(user)
    // user[0].sayHi()

    //this is me using a virtual
    console.log(user.namedEmail)
  } catch (error) {
    console.log(error.message)
  }
}

run()
