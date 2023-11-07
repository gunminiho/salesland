/////// iniciando server con express //////
const express = require("express");
const server = express();
///  CORS  add-ons ////
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
/// conexion a la DB con modelos y demas ///
const { conn } = require("./db_connection");
//// rutas para el back //////
const routes = require("./routes/index");
/// archivo de configuracion .env
require('dotenv').config();
const { SERVER_PORT } = process.env;
//////////////////////////////////////////////

//// seteando middlewares ///
server.use(morgan('dev'));
//server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.options('*', cors());
const corsOptions = {
    origin: '*', // Reemplaza esto con tu dominio de frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true, // Habilita las credenciales
};
server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
/// seteando rutas para el back
server.use('/', routes);

///levantando servidor:
server.listen(SERVER_PORT, async () => {
    console.log('Server listening at port 3001');
    await conn.sync({ alter: true });
    console.log('Database connected');
});