// We’ll declare all our dependencies here
const 	express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		mongoose = require('mongoose'),
		config = require('./config/database'),
		companies = require('./controllers/companies'),
		projects = require('./controllers/projects'),
		employees = require('./controllers/employees');

//Connect mongoose to our database
mongoose.connect(config.database, {useMongoClient: true});
// mongoose.set('debug', true);
//Declaring Port
const port = 3000;

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files

*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Invalid page");
})

//Routing all HTTP requests to the appropriate controller
app.use('/companies', companies);
app.use('/companies/:id/projects', projects);
app.use('/employees', employees);

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});