require('dotenv').config({ path: './config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4002;

const productRoute = require("./src/routes/productRoute");
const loginRoute = require("./src/routes/loginRoute");
const detailRoute = require("./src/routes/detailRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

require("./db")(app);

app.use("/login", loginRoute);
app.use("/product", productRoute);
app.use("/detail", detailRoute);

app.get("/",(req, res)=>{
    res.send("Hello from index ");
});

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
});
