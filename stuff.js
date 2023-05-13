const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
const portNumber = 3000;
require("dotenv").config({ path: path.resolve(__dirname, '.env') })

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};
const uri = `mongodb+srv://${userName}:${password}@cluster0.29ulgrq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set("views", path.resolve(__dirname, "templates"));
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

async function insertOp(client, databaseAndCollection, name) {
    let op = {name: name}
    try {
        await client.connect();
        const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(op);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

app.use(bodyParser.urlencoded({extended:false})); // for getting variables from form
app.post("/confirm", async(request, response) => {
    const variables = {
        name: ""
    }

    let {ops} = request.body;
    try{
      client.connect();
      let operator = {name: ops};
      await insertOp(client,databaseAndCollection,operator);
    }catch(e){
      console.error(e);
    }
    console.log("operator got: " + ops);
    variables.name = ops;
    //await insertOp(client,databaseAndCollection,ops);

    response.render("confirm", variables);
})


app.listen(portNumber);

// for testing (below)
postJSON();