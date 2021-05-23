const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProviderSchema = new Schema(
  {
    id: {
      type: Number
    },
  }
)

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required'     
    }, 
    phone: {
      type: String,
      required: 'Email is required'
    },
    email: {
      type: String,  
    },
    providers: [ProviderSchema],
  }
);

module.exports = mongoose.model('Client', ClientSchema);