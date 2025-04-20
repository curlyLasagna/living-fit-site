import express from 'express'
import routes from './routes/routes'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Living Fit Club API!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use('/api', routes);
