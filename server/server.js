import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import connectDB from "./config/dbConnection.js";

import authRouter from './router/authRouter.js'
import dashboardRouter from './router/dashboardRouter.js'
import movieRouter from './router/movieRouter.js'
import tvSeriesRouter from './router/tvseriesRouter.js'
import bookmarkRouter from './router/bookmarkRouter.js'


// setting up express server
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))
app.use(morgan());
app.disable('etag')

//// setting up cors. Only allowed origin can make api request
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Cookie'
};

app.use(cors(corsOptions));

await connectDB();

//routes
app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/movie', movieRouter);
app.use('/api/tv', tvSeriesRouter);
app.use('/api/bookmark', bookmarkRouter);

const port = process.env.PORT || 8000;

const server = app.listen(port);
