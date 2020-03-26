const express = require('express');
const routes = express.Router();

const OngsController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


routes.post('/sessions', SessionController.create)

//ONGS
routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.create);

//PROFILE
routes.get('/profile', ProfileController.index);

//INSIDENTS
routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete)


module.exports = routes;