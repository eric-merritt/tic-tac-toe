#!/usr/bin/env node;

let createError = require("http-errors");
let express = require("express");
let path = require("node:path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let dotenv = require("dotenv");
let ejs = require("ejs");
let process = require("node:process");
let port = process.env.PORT | 8383;


let app = express();

dotenv.config();

// view engine setup
// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("views"));

const { gameBoard, playerFactory, checkWinner } = require("./src/gameplay.js");

let board = gameBoard().getBoard();


app.get("/", async (req, res, next) => {

	const [gameboard, index] = await Promise.all([
		ejs.renderFile('./views/partials/gameboard.ejs', { board: board, cache: true }),
		ejs.renderFile('./views/layouts/index.ejs', { cache: true }),
	])


	try {
		const pageContent = index.replace("{{gameboard}}", gameboard);
		res.status(200).send(pageContent);
	}	catch(err) {
			let error = createError(err);
			console.log(error);
			next(error);
	};
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
