const Restaurant = require("./model/Restaurants"),
    http = require("http"),
    url = require("url"),
    fs = require("fs"),
    io = require("socket.io"),
    orderModel = require("./model/Order"),
    mongoose = require("mongoose"),
    connectionString = 'mongodb://dbUser:mongo123@cluster0-shard-00-00-ioqjd.mongodb.net:27017,cluster0-shard-00-01-ioqjd.mongodb.net:27017,cluster0-shard-00-02-ioqjd.mongodb.net:27017/restaurants?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  mongoose
  .connect(connectionString, {  useNewUrlParser: true} )
  .then(  () => { console.log("Mongoose connected successfully "); },
   error => { console.log("Mongoose could not connect to database: " + error);  }
   );

const server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case "/":
      fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) return send404(res);
        res.writeHead(200, {
          "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
        });
        res.write(data, "utf8");
        res.end();
      });
      break;

    default:
      send404(res);
  }
});
const send404 = function(res) {
  res.writeHead(404);
  res.write("404");
  res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));

// socket.io, I choose you
const ioServer = io.listen(server);

// socket.io setup and manager
ioServer.on("connection", function(socket) {
  // now we have a client object!
  console.log("Connection accepted.");

  // event listeners
  socket.on("message", function(message) {
    console.log(`Recieved message: ${message} - from client`);
    socket.emit("msgreceived");
  });

  socket.on("disconnect", function() {
    console.log("Disconnected...");
  });

  socket.on("get-restaurants", () => {
    console.log("server - get-restarants called");

    Restaurant.find((error, document) => {
      if (error) console.log(`Error occured on Restaurant.find(; ${error})`);
      else {
        console.log(`data returned ${document}`)

        const data = document.map(x => x.name);
        console.log(data)
        socket.emit("restaurants-data", data);
      }
    });
      //challenge
  socket.on("challenge", () => {
    console.log("server - get-restaurants called");

    Restaurant.find({
        $and: [{
          city: "Queens"
        }, {
          cuisine: "Delicatessen"
        }]
      }, {
        city: 1,
        cuisine: 1
      },
      (error, document) => {
        if (error) console.log(`Error occured on Restaurant.find(; ${error})`);
        else {
          console.log(`data returned ${document}`)

          const data = document.map((x) => x);
          console.log(data)
          socket.emit("challenge-data", JSON.stringify(document));

        }
      })
  });
    
  });
  // ADD A SOCKET EVENT EVENT LISTENER FOR 'get-oders' AND PROVIDE A CALLBACK FUNCTION THAT DOES THE FOLLOWING
  // - OUTPUTS TO THE CONSOLE THAT THE EVENT WAS TRIGGERED:
  socket.on("get-orders", () => {
    console.log("server - get-orders called");

    orderModel.find((error, document) => {
      if (error) console.log(`Error occured on orderModel.find(; ${error})`);
      else {
        console.log(`Order returned ${document}`)
        socket.emit("orders-data", JSON.stringify(document));
      }
    });
  });

  // TASK: ADD A SOCKET EVENT LISTENER FOR 'add-order' AND PROVIDE A CALLBACK FUNCTION THAT DOES THE FOLLOWING:
  // - OUTPUTS TO THE CONSOLE THAT THE EVENT WAS TRIGGERED
  // - ADDS AN ORDER USING MONGOOSE.CREATE() OR MONGOOSE.SAVE()
  // NOTE: YOU CAN HARD CODE THE STATIC DATA HERE FOR NAME IN THE server.js
  // - EMIT AN EVENT BACK TO THE CLIENT USING THE NAMED EVENT 'order-data-added' TO NOTIFY THE ORDER WAS ADDED.
  socket.on("add-order", () => {
    console.log("server - add-order called");

    createOrder.find((error, document) => {
      if (error) console.log(`Error occured on createOrder.find(; ${error})`);
      else {
        console.log(`Add Order returned ${document}`)
        socket.emit("order-data-added", JSON.stringify(document));
      }
    });
  });
});
