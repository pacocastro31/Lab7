
const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://paco:paco@cluster0-rmnta.mongodb.net/test?retryWrites=true'

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
