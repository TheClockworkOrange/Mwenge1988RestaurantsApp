import { Mongoose } from "mongoose";

Mongoose.connect('mongodb://dbUser:mongo123@cluster0-shard-00-00-ioqjd.mongodb.net:27017,cluster0-shard-00-01-ioqjd.mongodb.net:27017,cluster0-shard-00-02-ioqjd.mongodb.net:27017/restaurants?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')