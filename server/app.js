const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pgPool = require("./db/pool");
const loginRouter = require("./routers/loginRouter");
const msgRouter = require("./routers/msgRouter");
const logoutRouter = require("./routers/logoutRouter");
const membershipRouter = require("./routers/membershipRouter");

const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://darkprince-msg-board.netlify.app"
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS")); // block
      }
    },
    credentials: true
  }),
);

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "development",
    },
  }),
);

app.use("/", loginRouter);
app.use("/message", msgRouter);
app.use("/logout", logoutRouter);
app.use("/membership", membershipRouter);

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server is listening on port 8000");
});
