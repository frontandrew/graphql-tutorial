const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const schema = require('../schema/schema')
const mongoose = require('mongoose')

const app = express()
const PORT = 3005

mongoose.connect(
  'mongodb+srv://admin:363463920@cluster0.o5rf8.mongodb.net/Movies_Directors?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

const dbConnection = mongoose.connection
  .on('error', err => console.info(`COnnection error: ${err}`))
  .once('open', () => console.info('Connected to DB!'))


app.listen(PORT, err => {
  err ? console.log(error) : console.log('Server started!')
})
