const clientsController = require('../controllers/clientController');

module.exports = app => {
  app
    .route('/clients')
    .get(clientsController.list_all_clients)
    .post(clientsController.create_a_client);

  app
    .route('/clients/:clientId')
    .put(clientsController.update_a_client)
    .delete(clientsController.delete_a_client);
};