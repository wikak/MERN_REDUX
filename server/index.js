const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expressServer = express();
const router = require("./route");
const http = require("http");
const mongoose = require("mongoose");

//mongoose.set("useFindAndModify", false);

mongoose.connect(
  "mongodb+srv://root:adminnosql@cluster0-12cfb.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

mongoose.connection
  .once("open", () => console.log("Connection réussie"))
  .on("error", error => console.log("Erreur de connexion à Mongo : ", error));

expressServer.use(morgan("combined"));
expressServer.use(bodyParser.json({ type: "*/*" }));

const port = 3090;
const server = http.createServer(expressServer);
router(expressServer);
server.listen(port);
console.log("Le serveur écoute sur le port:", port);
