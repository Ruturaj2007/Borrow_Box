const { config } = require('dotenv')
config();
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

const signupRoutes = require('./src/routes/signUp');
const loginRoutes = require('./src/routes/login')
const addProductsRouters = require("./src/routes/addProducts");
const meRoutes = require("./src/routes/me");

const port = process.env.PORT

app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true
}));
app.use(cookieParser());

app.use(express.json())

app.use('/api', signupRoutes,loginRoutes,addProductsRouters,meRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

module.exports = app;
