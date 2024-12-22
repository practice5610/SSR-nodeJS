const JavaScriptObfuscator = require("javascript-obfuscator");
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
const domain = "https://search1.quizzz.in";
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
  const image = getRandomImage(); // Generate random image link
  const jsCode = `
    const pageOptions = {
      pubId: "partner-pub-5923063580321664",
      adsafe: "medium",
      styleId: "7970653824",
      adtest: "on",
      relatedSearchTargeting: "query",
      query: "Mesothelioma attorneys,Asbestos lawyers,Best car insurance,Life insurance, personal loan",
      resultsPageBaseUrl: "${domain}/attorneys-result.php",
      resultsPageQueryParam: "q",
    };

    const adblock = {
      container: "afscontainer1",
      number: 4,
      width: 1920,
    };

    const rsblock = {
      container: "afscontainer2",
      relatedSearches: 10,
      width: 1920,
    };

    _googCsa("ads", pageOptions, adblock, rsblock);
  `;

  // Obfuscate the JavaScript code
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(jsCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: false,
    shuffleStringArray: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: ["rc4"],
    stringArrayThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    disableConsoleOutput: true,
    renameGlobals: true,
    selfDefending: true,
    transformObjectKeys: true,
  }).getObfuscatedCode();

  res.render("index", { image, obfuscatedCode });
});
app.get("/attorneys-result.php", (req, res) => {
  const query = req.query.q; // Get the 'q' parameter from the URL
  const jsCode = `
    const pageOptions = {
      pubId: "partner-pub-5923063580321664",
      adsafe: "medium",
      styleId: "3383664105",
      adtest: "on",
      relatedSearchTargeting: "query",
     query: "Mesothelioma attorneys,Asbestos lawyers,Best car insurance,Life insurance, personal loan",
      resultsPageBaseUrl: "${domain}/attorneys-result.php",
      resultsPageQueryParam: "q",
    };

    const adblock = {
      container: "afscontainer1",
      number: 4,
      width: 1920,
    };

    const rsblock = {
      container: "afscontainer2",
      relatedSearches: 10,
      width: 1920,
    };

    _googCsa("ads", pageOptions, adblock, rsblock);
  `;

  // Obfuscate the JavaScript code
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(jsCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: false,
    shuffleStringArray: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: ["rc4"],
    stringArrayThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    disableConsoleOutput: true,
    renameGlobals: true,
    selfDefending: true,
    transformObjectKeys: true,
  }).getObfuscatedCode();

  res.render("result", { query, obfuscatedCode }); // Render the EJS template with the query
});

// start server
const port = process.env.port || 3002;
app.listen(port, () => {
  console.log(`app start listining on port ${[port]}`);
});
