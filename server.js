const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const wallets = require("./routes/api/wallets");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/users", users);
app.use("/api/wallets", wallets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
