import express from 'express'
import mongoose from 'mongoose'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import passport from 'passport'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import favicon from 'serve-favicon'

import ssr from './routes/ssr.js'
import tests from './routes/tests.js'
import api from './routes/api.js'

const app = express()

const port = process.env.PORT || 8000

const configDB = require('./config').database
mongoose.connect(configDB.url)

require('./config/passport')(passport)

app.use(helmet())
app.use(logger('dev'))
app.use(favicon('public/favicon.png'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cookieSession({
  name: 'HERMN_SSR',
  keys: ['ap32_201lut', 'rocka340', '201lutrockab'  ],
  // Cookie Options
  maxAge: 1 * 60 * 60 * 1000 // 1 hour
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/tests', tests)
app.use('/', api)

app.use('/', ssr) //This goes last!
 
// process.env.NODE_ENV = "production"

app.listen(port, () => {
	console.log('server listing on port ', port)
})