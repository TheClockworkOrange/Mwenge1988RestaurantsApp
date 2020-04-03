// TASK 1: GET ORDERS - In the Model folder of the application 
// - create an Order Schema that contains an orderId, item and customer_name
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {type: String, require: true},
    item: {type: String, require: true},
    customer_name: {type: String, require: true}
})

module.exports = mongoose.model('Order', orderSchema);