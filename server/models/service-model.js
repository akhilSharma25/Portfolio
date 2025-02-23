const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the service schema
const serviceSchema = new Schema({
  serviceId: {
    type: String,
    required: true,
    unique: true,
    description: "Unique identifier for the service"
  },
  serviceName: {
    type: String,
    required: true,
    description: "The name of the service"
  },
  price: {
    type: String,
    required: true,
    description: "Price of the service in INR (Indian Rupees)"
  },
  description: {
    type: String,
    required: true,
    description: "A brief description of the service"
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create a model from the schema
const Service = new mongoose.model('Service', serviceSchema);

module.exports = Service;
