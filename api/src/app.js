const session = require('express-session')
const express = require('express')
const cookieParser = require('cookie-parser')
const MemoryStore = require('memorystore')(session)
var cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // for “Content-Type: application/x-www-form-urlencoded”,
app.use(cookieParser())

app.use(
  session({
    secret: 'plateforme_secret',
    store: new MemoryStore(),
    expires: new Date(Date.now() + 30 * 86400 * 1000),
    saveUninitialized: true,
    resave: false,
    maxAge: null,
    cookie: {},
  }),
)

app.use(cors())
app.use('/', routes)
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  })
  next()
})

app.on('close', () => {})

module.exports = app
