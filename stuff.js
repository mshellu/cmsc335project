const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
const portNumber = process.env.PORT || 3000

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};
const uri = `mongodb+srv://${userName}:${password}@cluster0.29ulgrq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set("templates", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

async function postJSON() {
    try {
      const response = await fetch("https://rhodesapi.up.railway.app/api/operator/Texas");
      const result = await response.json();
      console.log("Success:", result);
      process.exit(0)
    } catch (error) {
      console.error("Error:", error);
    }
}
//app.set("view engine", "ejs"); 
app.get("/", function(request, response){ 
    response.render("index"); 
}); 
  

app.listen(portNumber);

// for testing (below)
postJSON();