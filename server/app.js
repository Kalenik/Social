const config = require('config'),
	PORT = process.env.PORT || 5000,
	NODE_ENV = process.env.NODE_ENV,
	express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io')(server, {
		pingTimeout: 30000
	}),
	socketManager = require('./socket/socketManager'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	graphqlHttp = require('express-graphql'),
	mongoose = require('mongoose'),
	fileUpload = require('express-fileupload'),
	graphQlSchema = require('./graphql/schema'),
	graphQlResolvers = require('./graphql/resolvers'),
	handleGraphqlError = require('./middleware/handleGraphqlError'),
	isAuth = require('./middleware/is-auth'),
	log = require('./helpers/logger/log')(module.filename),
	userSocketIds = {},
	file = require('./routes/file');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Credentials', true);

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use(handleGraphqlError);

app.use(isAuth);

app.use(fileUpload());

app.use('/file', file);

app.use(
	'/graphql',
	graphqlHttp((req, res) => ({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: NODE_ENV === 'development',
		context: { req, res, io, userSocketIds },
		customFormatErrorFn: error =>
			NODE_ENV === 'development'
				? {
						message: error.message,
						locations: error.locations,
						stack: error.stack ? error.stack.split('\n') : [],
						path: error.path
				  }
				: {
						message:
							res.statusCode < 500
								? error.message
								: 'Server Error'
				  }
	}))
);

app.use(express.static(__dirname + '/static'));

app.use((err, req, res, next) => {
	res.status(err.status ? err.status : 500);

	if (NODE_ENV === 'development') {
		res.send({
			errors: [
				{
					message: err.message,
					stack: err.stack ? err.stack.split('\n') : []
				}
			]
		});
	} else {
		res.send({
			errors: [
				{
					message: res.statusCode < 500 ? err.message : 'Server Error'
				}
			]
		});
	}

	log.error(err);
});

mongoose
	.connect(
		`mongodb+srv://${config.get('mongo.user')}:${config.get(
			'mongo.password'
		)}@cluster-i76yn.azure.mongodb.net/${config.get(
			'mongo.db'
		)}?retryWrites=true`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	)
	.then(() => {
		server.listen(PORT, () => log.info(`Server started on port ${PORT}`));
		socketManager(io, userSocketIds);
	})
	.catch(err => log.error(err));
