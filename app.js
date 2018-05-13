// We’ll declare all our dependencies here
const 	express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		mongoose = require('mongoose'),
		companies = require('./controllers/companies'),
		projects = require('./controllers/projects'),
		employees = require('./controllers/employees');

//Connect mongoose to our database
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
mongoose.connection.on('connected', () => {
	console.log(`Database connected: ${process.env.DATABASEURL}`);
});
mongoose.connection.on('error', (err) => {
	console.log(`Database error: ${err}`);
})
mongoose.set('debug', true);
//Declaring Port
const port = process.env.PORT || 8080;

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Routing all HTTP requests to the appropriate controller
app.use('/api/companies', companies);
app.use('/api/companies/:id/projects', projects);
app.use('/api/employees', employees);

// app.get('/', (req, res) => {
//     res.send("Invalid page");
// });

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

console.log(process.env.PORT, process.env.DATABASEURL);

//Listen to port
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});