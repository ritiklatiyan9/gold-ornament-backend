import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {corsOptions} from './origin/corsOptions.js'

const app = express()






// Enable CORS with custom options
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes import

import  Message  from './routes/message.route.js'



app.use("/api/messages", Message)




export { app }