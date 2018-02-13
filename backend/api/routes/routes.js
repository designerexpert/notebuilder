const middleware = require('../middlewares/middleware');
const userControllerMethods = require('../controllers/userControllers');

module.exports = (app) => {
    app.route('/').get((req, res) => res.json({ message: 'Server Reachable' })); // Default API Endpoint for Testing the Server and Port
    app.route('/register').post(middleware.hashPassword, userControllerMethods.createUser);
    app.route('/login').post(middleware.authenticate, userControllerMethods.login);
    app.route('/update').put(middleware.authenticate, middleware.changePassword, userControllerMethods.updateUser); // Update Password
    app.route('/users').delete(middleware.authenticate, userControllerMethods.deleteUser); // Deletes user with specified email and password

    app.route('/users').get(middleware.validateToken, userControllerMethods.users); // Shows all Users: ADMIN ROUTE
    app.route('/users/:id').get(middleware.validateToken, userControllerMethods.userById); // Shows user with specified ID: ADMIN ROUTE    
};