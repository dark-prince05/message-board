const express = require('express') 
const path = require('path')
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
  res.render("homepage")
})

app.listen(8000, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("server is listening on port 8000")
})
