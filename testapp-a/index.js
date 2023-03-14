//import required modules
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

//Mongo stuff
//const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const dbUrl = "mongodb+srv://testdbuser:wingo95@cluster0.oevlwqk.mongodb.net/testdb?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl);

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//in order to parse POST body data as JSON, do the following
//The following lines will convert form data from query
//string format to JSON format.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//test Express app
app.get("/", async (request, response) => {
  //response.status(200).send("Test page again");
  links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});

app.get("/cloths", async (request, response) => {
      links = await getLinks();
      cloths = await getclothLinks();
      response.render("cloths", { title: "Cloths", menu: links, cloths: cloths});
    });
app.get("/shoes", async (request, response) => {
      links = await getLinks();
      shoes = await getshoesLinks();
      response.render("shoes", { title: "Shoes", menu: links, shoes: shoes});
    });

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//Mongo functions
async function connection() {
  await client.connect();
  db = client.db("testdb"); //select testdb database
  return db;
}
/* async function to retreive all links documents from clothlinks collection */
async function getclothLinks() {
  db = await connection(); //await result of connection and store the returned db
  var results = db.collection("clothLinks").find({}); //as the query means no filter, so select all
  res = await results.toArray();
  return res;
}/* async function to retreive all links documents from shoeslinks collection */
async function getshoesLinks() {
  db = await connection(); //await result of connection and store the returned db
  var results = db.collection("shoesLinks").find({}); //as the query means no filter, so select all
  res = await results.toArray();
  return res;
}
/* async function to retreive all links documents from menulinks collection */
async function getLinks() {
  db = await connection(); //await result of connection and store the returned db
  var results = db.collection("menuLinks").find({}); //as the query means no filter, so select all
  res = await results.toArray();
  return res;
}

// Background image
// https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700405979.jpg

// Main page image
// https://cdn-icons-png.flaticon.com/512/545/545546.png
// https://cdn-icons-png.flaticon.com/512/88/88794.png
// https://cdn-icons-png.flaticon.com/512/3129/3129384.png
// https://cdn-icons-png.flaticon.com/512/2776/2776827.png
// https://cdn-icons-png.flaticon.com/512/448/448887.png
// https://cdn-icons-png.flaticon.com/512/4703/4703487.png
// https://cdn-icons-png.flaticon.com/512/4163/4163679.png
// https://cdn-icons-png.flaticon.com/512/6820/6820171.png

// Cloths page image
// https://media.everlane.com/image/upload/c_fill,dpr_2,f_auto,g_face:center,q_auto,w_auto/v1/i/ab5aff0c_6c1e.jpg
// https://media.everlane.com/image/upload/c_fill,dpr_2,f_auto,g_face:center,q_auto,w_auto/v1/i/4a1ab5f9_d1a9.jpg
// https://media.everlane.com/image/upload/c_fill,dpr_2,f_auto,g_face:center,q_auto,w_auto/v1/i/68408635_5938.jpg
// https://media.everlane.com/image/upload/c_fill,w_2048,ar_1:1,q_auto,dpr_1.0,g_face:center,f_auto,fl_progressive:steep/i/eb2fd90c_b2c0
// https://media.everlane.com/image/upload/c_fill,w_750,ar_1:1,q_auto,dpr_1.0,g_face:center,f_auto,fl_progressive:steep/i/9b188ae2_9b8d
// https://media.everlane.com/image/upload/c_fill,w_2048,ar_1:1,q_auto,dpr_1.0,g_face:center,f_auto,fl_progressive:steep/i/f70559a8_78ef

// Shoes page image
// https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dw62e19464/257411_1.jpg?sw=1920&sh=2170
// https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dwfd8cabd1/259867_1.jpg?sw=1920&sh=2170
// https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dwe312af0a/261314_1.jpg?sw=1920&sh=2170
// https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dwc4b2c1a9/264538_1.jpg?sw=1920&sh=2170
// https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dw94f47d16/265675_1.jpg?sw=1920&sh=2170
// https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dwcef2d61e/262413_1.jpg?sw=1920&sh=2170
