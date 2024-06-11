const mongoose = require("mongoose");
const mongodb = require("mongodb");
const ejs = require("ejs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.listen(() => {
  console.log("Kitchen is Up & Running");
});

app.get("/path", (request, response) => {
  response.send("Data requested from /path");
});

// MongoDB connection setup
const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster0.7xtho5g.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(express.json());

// Schema and model for the Desserts
const dessertSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
  flavor: { type: String, required: true },
  quantity: { type: Number, required: true },
  ingredients: { type: String },
  imageURL: { type: String }
});
const Dessert = mongoose.model("Dessert", dessertSchema);

app.get("/dessert", (req, res) => {
  Dessert.find({}).then((data) => {
    res.status(200).render("inventory.ejs", {data: data});
  });
});

app.get("/admin", (req, res) => {
  Dessert.find({}).then((data) => {
    res.status(200).render("admin.ejs", {data: data});
  });
});

app.post("/add", (req, res) => {
  const dessert = new Dessert({
    itemType: req.body.itemType,
    flavor: req.body.flavor,
    quantity: req.body.quantity,
    ingredients: req.body.ingredients,
    imageURL: req.body.imageURL,
  });

  dessert.save().then((data) => {
    res.json(data);
  })
  .catch((error) => {
  console.error("Error fetching items:", error);
  res.status(500).sendFile(__dirname + "/public/500.html")
  })

  
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html")
});