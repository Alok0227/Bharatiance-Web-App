const connectTOMongo = require("./db");

connectTOMongo();

const express = require('express')
const app = express()
const port = 5000;
const cors = require("cors");
app.options("*", cors())

const corsOptions = {
  origin:"http://localhost:3000"
}

app.use(cors(corsOptions))
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post("/", (req, res) => {
    res.send("Working");
});

app.use("/api/faculty", require("./routes/Faculty"));
app.use("/api/student", require("./routes/Student"));


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})