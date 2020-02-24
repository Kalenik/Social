const config = require('config'),
	PORT = process.env.PORT || 8080,
	NODE_ENV = process.env.NODE_ENV,
	express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io')(server, {
		pingTimeout: 30000,
		cookie: false
	}),
	socketManager = require('./socket/socketManager'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	graphqlHttp = require('express-graphql'),
	mongoose = require('mongoose'),
	path = require('path'),
	graphQlSchema = require('./graphql/schema'),
	graphQlResolvers = require('./graphql/resolvers'),
	isAuth = require('./middleware/is-auth'),
	handleGraphqlError = require('./middleware/handleGraphqlError'),
	setCloudinary = require('./middleware/setCloudinary'),
	log = require('./helpers/logger/log')(module.filename),
	userSocketIds = {},
	avatar = require('./routes/avatar');

if (NODE_ENV === 'production') {
	app.use((req, res, next) => {
		if (req.header('x-forwarded-proto') !== 'https')
			res.redirect(`https://${req.header('host')}${req.url}`);
		else next();
	});
}

app.use((req, res, next) => {
	const allowedOrigins = [
			'https://well.netlify.com',
			'http://localhost:3001'
		],
		origin = req.headers.origin;

	if (allowedOrigins.indexOf(origin) !== -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie'
	);
	res.header('Access-Control-Expose-Headers', 'Set-Cookie');
	res.header('Access-Control-Allow-Credentials', true);

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
});

app.use(cookieParser());
app.use(bodyParser.json({ limit: 1024 * 1024 * 1 }));

app.use(isAuth);
app.use(handleGraphqlError);
app.use(setCloudinary);

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

app.use('/avatar', avatar);

app.use(express.static(path.join(__dirname, 'public'))); // public folder will be created by webpack client

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

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
		server.listen(PORT, () =>
			log.info(`Server(${NODE_ENV}) started on port ${PORT}`)
		);
		socketManager(io, userSocketIds);
	})
	.catch(err => log.error(err));
