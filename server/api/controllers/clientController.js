const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.list_all_clients = (req, res) => {
  Client.find({}, (err, clients) => {
    if (err) res.send(err);
    res.json(clients);
  });
};

exports.create_a_client = (req, res) => {
  const newClient = new Client(req.body);
  newClient.save((err, client) => {
    if (err) res.send(err);
    res.json(client);
  });
};

exports.update_a_client = (req, res) => {
  Client.findOneAndUpdate(
    { _id: req.params.clientId },
    req.body,
    (err, client) => {
      if (err) res.send(err);
      res.json(client);
    }
  );
};

exports.delete_a_client = (req, res) => {
  Client.deleteOne({ _id: req.params.clientId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'client successfully deleted',
      _id: req.params.clientId
    });
  });
};