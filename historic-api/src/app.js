/** 
 * This is express application that uses the specific routers for getting quotes in the Mongo database. It also requires mongoose middleware for manipulating the data.
 **/
const express = require('express');
require('./db/mongoose');
const quoteRouter = require('./routers/quote');

const app = express();

app.use(express.json());
app.use(quoteRouter);

module.exports = app;