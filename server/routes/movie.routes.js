const MovieController = require('../controllers/movie.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post('/api/movies/create', authenticate, MovieController.createAnMovie);
  app.get('/api/movies/all', MovieController.findAllMovies);
  app.get('/api/movies/one/:id', authenticate, MovieController.findOneMovie);
  app.get(
    '/api/movies/byUser/:userName',
    authenticate,
    MovieController.findAllMoviesByUser
  );
  app.put('/api/movies/update/:id', authenticate, MovieController.updateMovie);
  app.delete(
    '/api/movies/delete/:id',
    authenticate,
    MovieController.deleteMovie
  );
};
