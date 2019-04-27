/** 
 * This is the entry point for node to run the application. It includes the app on app.js for running express 
 **/
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})