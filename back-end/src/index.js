const express = require('express');
const routes = require("./routes");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333)

/**
 * Tipos de Parametros
 * 
 * Query : Parametros menoados enviados na rotas apos a "?"(filtros e paginações)
 * Route Params : Parâmentros utilizados para idenficar recursos
 * Request Body: Corpo da Requisicao
 */


/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */


/**
 * Driver: Select * from users
 * Query Builder: table('users').select('*').where()
 */