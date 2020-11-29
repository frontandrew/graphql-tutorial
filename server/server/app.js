const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const schema = require('../schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
const PORT = 3005

const atlasURI = 'mongodb+srv://Andrew:363463920@cluster0.o5rf8.mongodb.net/Movies_Directors?retryWrites=true&w=majority'
mongoose.connect(
  atlasURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

mongoose.connection
  .on('error', err => console.info(`Connection error: ${err}`))
  .once('open', () => console.info('Connected to DB!'))


app.listen(PORT, err => {
  err ? console.log(error) : console.log('Server started!')
})
