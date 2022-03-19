const path = require("path")
require("dotenv").config({path: "../.env"})
// require('dotenv').config()

/* ==== External Modules ==== */
const express = require("express");
const cors = require("cors")
/* ==== Internal Modules ==== */

/* ==== Instanced Modules  ==== */
const app = express();
const routes = require("./routes");
/* ==== Configuration ==== */
const config = require("@react/config");

/* ==== Middleware ==== */

app.use(express.static(path.join("build")))
// //this helps us read the body, req.body also works with Postman
app.use(express.urlencoded({extended: true}))
// //parse some json :)))
app.use(express.json())
app.use(cors())

/* ====  Routes & Controllers  ==== */
app.use("/api", routes)
app.get('/favicon.ico', function(req,res){
    res.send("404");
  })
app.all("/api/*", (req, res, next) => {
 	res.send("HOLD UP THESE ARE NOT THE APIS YOU ARE LOOKING FOR")
 })
//SUPER AMAZING MAGICAL MONOREPO FULL STACK MIDDLEWARE
//This targets all routes that aren't specified by our specific server routes that are not "/api"
//ANY REQUESTS not covered by our routes will get piped into this middleware! This literally hands over control to React
app.use((req, res, next) => {
//res.sendFile(path.join(__dirname, "build", "index.html"))
})


/* ====  Server Listener  ==== */
app.listen(config.PORT, () => {
	console.log(
		`reaxion is live at http://localhost:${config.PORT}.`
	);
})