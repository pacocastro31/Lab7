const express = require('express')
require('./db/mongoose.js')

const Character = require('./models/character.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/addperson', function(req, res) {
  const person = new Character(req.body)
  person.save().then(function() {
      return res.send(person)
  }).catch(function(error) {
      return res.status(400).send(error)
  })
})

app.get('/allpersons', function(req, res) {
  Character.find({}).then(function(persons) {
    res.send(persons)
  }).catch(function(error) {
    res.status(500).send(error)
  })
})

app.get('/getperson/:id', function(req, res) {
  const _id = req.params.id
  Character.findById(_id).then(function(person) {
    if(!person){
      return res.status(404).send()
    }
    return res.send(person)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.patch('/modifyperson/:id', function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'father', 'mother']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  Character.findByIdAndUpdate(_id, req.body).then(function(person) {
    if(!person){
      return res.status(404).send()
    }
    return res.send(person)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.delete('/deleteperson/:id', function(req, res) {
  const _id = req.params.id
  Character.findByIdAndDelete(_id, req.body).then(function(person) {
    if(!person) {
      return res.status(404).send()
    }
    return res.send(person)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
})

app.listen(port, function() {
    console.log('Winter is coming on port ' + port)
})
