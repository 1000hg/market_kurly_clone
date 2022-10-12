const path = require("path");
const express = require("express");
const session = require("express-session");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const indexRouter = require("./routes");

const { swaggerUi, specs } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

dotenv.config();

app.use(session({
  HttpOnly: true,
  secure: true,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 24000 * 60 * 60}
}));
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({ limit:"50mb", extended: true }));


app.use("/", indexRouter);
app.use("/api", indexRouter);

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    console.log("err 발생");
  }

  console.log("정상구동");
});
