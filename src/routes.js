const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const PostController = require('./controllers/PostController');
const IncidentController = require('./controllers/IncidentController');

const Post = require('./models/Post');

routes.get('/posts', PostController.index);
routes.post('/posts', multer(multerConfig).single('file'), PostController.store);
routes.delete('/posts/:id', PostController.delete);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;
