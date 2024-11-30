const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index")


// iss line se hamari .env file me jitne bhi variables honge woh sare use me ah jayenge hm unhe use kr payenge
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave : false,// means save mt kro
    saveUninitialized : false,//iska mtlb ager koi bnda web per ata hai joh login ya initialised ni hai tohh session create mt kro
    secret : "hehehe",
  })
)
// ager hme flash message use krne h toh hme session use krna hi pdega
app.use(flash())
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);