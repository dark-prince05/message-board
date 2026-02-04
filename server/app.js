const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pgPool = require('./db/pool') 
const loginRouter = require("./routers/loginRouter");
const msgRouter = require("./routers/msgRouter");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  }),
);

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: 'session',
      createTableIfMissing: true
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 8 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    },
  }),
);

app.use("/", loginRouter);
app.use("/message", msgRouter);

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server is listening on port 8000");
});
