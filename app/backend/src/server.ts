import express from 'express'
import routes from './routes/routes'
import cors from "cors";


const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4321',
  methods: ["GET", "POST"],
  credentials: false
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Living Fit Club API!'
  })
})

app.listen(port, () => {
  console.log(`Living Fit Club API running at port ${port}`)
})
app.use('/api', routes);
