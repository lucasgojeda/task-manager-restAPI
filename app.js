const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const logger = require("morgan");
require('dotenv').config();

const publicPath = path.join(__dirname, '..', 'public');

const { dbConnection } = require('./database/config');
const { swaggerDocs } = require('./v1/swagger');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            task: '/api/task',
        }

        this.conectarDB();

        this.middlewares();

        this.routes();
    };

    async conectarDB() {
        await dbConnection()
    };

    middlewares() {
        this.app.use(cors());

        this.app.use(logger("dev"));
        // this.app.use(cookieParser());

        //Reading and parsing of the body.
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.json());

        this.app.use(express.static(publicPath));

        /** Swagger docs */
        swaggerDocs(this.app, this.port)
    };

    routes() {
        this.app.use(this.paths.auth, require('./routes/auth.routes'));
        this.app.use(this.paths.task, require('./routes/task.routes'));
    };
    listen() {
        this.app.listen(this.port, () => {
            console.log(
                "\x1b[90m",
                'Server listening on port: ',
                this.port
            );
        });
    };
};

const server = new Server();

server.listen();


