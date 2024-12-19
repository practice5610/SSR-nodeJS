const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getRandomQuery = () => {
  const queries = [
    "commercial trash bins",
    "accredited online psychology programs",
    "best online bachelor degree in accounting",
    "cheap medical insurance for senior citizens",
    "business team management software tools",
    "online employee scheduling software workforce management",
    "health information technology bachelor degree online",
    "best online degrees for adults",
    "closest jiffy lube near me",
    "quote mortgage",
    "enterprise information management software",
    "homeowners insurance league city tx",
  ];
  return queries[Math.floor(Math.random() * queries.length)];
};
const getRandomImage = () => {
  const imageIndex = Math.floor(Math.random() * 13) + 1; // Random number between 1 and 13
  return `https://performdigi.com/img${imageIndex}.png`;
};
// start requests
app.get("/", async (req, res) => {
  const query = getRandomQuery(); // Generate dynamic query
  const image = getRandomImage(); // Generate random image link
  res.render("index", { query, image }); // Pass query and image to EJS
});
app.get("/result.php", (req, res) => {
  const query = req.query.q; // Get the 'q' parameter from the URL
  res.render("result", { query }); // Render the EJS template with the query
});

// start server
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`app start listining on port ${[port]}`);
});
