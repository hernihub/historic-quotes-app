/** 
 * This is the mongoose configuration that uses environment variables to get to MongoDB. It includes recommended parameters even if deprecated.
 **/
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})