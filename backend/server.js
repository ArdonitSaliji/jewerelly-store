const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 5000;
const cors = require("cors");
const routesUrls = require("./routes");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

dotenv.config();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(
  cors({
    options: {
      origin: "*",
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DATABASE_ACCESS,
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "jewerelly" },
  () => console.log("Database Connected")
);

app.use("/", routesUrls);

app.use((req, res, next) => {
  if (req.session.user) next();
  else res.status(401);
});

app.listen(port, () => console.log(`Server started at port ${port}`));
