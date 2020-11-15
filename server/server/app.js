const expres = require('express')

const app = express()
const PORT = 3005

app.listen(PORT, err => {
  err ? console.log(error) : console.log('Server started!')
})
