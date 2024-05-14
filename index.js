const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

const authRoute = require('./src/routes/auth.route');
const productsRoute = require('./src/routes/product.route')

app.use(express.json());
app.use(cors());
app.use('/api', authRoute);
app.use('/api', productsRoute)

app.listen(port, (err) => {
  if(err) {
    process.exit(1);
  }
  console.log(`Server running on port ${port}`);
});