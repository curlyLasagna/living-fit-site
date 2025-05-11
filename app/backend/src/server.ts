import express from 'express'
import routes from './routes/routes'
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:4321',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Living Fit Club API!'
  })
})

app.listen(port, () => {
  console.log(`Living Fit Club API running at port ${port}`)
})

// Add this to log which routes are being accessed

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Use route resolver
app.use('/api', routes);
