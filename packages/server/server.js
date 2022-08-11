const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const indexRouter = require('./routes');
dotenv.config();

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    console.log('err 발생');
  }

  console.log('정상구동');
});
