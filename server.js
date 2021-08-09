require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConfig = require ("./config/db.config");
const app = express();
const routes = require('./routes/api')

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use('/api', routes)

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Linas application." });
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
console.log(dbConfig)

const db = require("./models");
console.log(process.env.ATLAS_URI)
//  || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}
db.mongoose
  .connect(process.env.ATLAS_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}