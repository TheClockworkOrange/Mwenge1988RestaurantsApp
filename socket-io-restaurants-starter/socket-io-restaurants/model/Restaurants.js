import { Mongoose } from "mongoose";

const restaurantShema = new Mongoose.Schema({
    city: {
        type: String,
        require: true
    },
    cuisine: String,
    name: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: true
    }
});
const Restaurant = mongoose.model('Restaurant', restaurantShema, 'Restaurants');
module.exports = Restaurant;