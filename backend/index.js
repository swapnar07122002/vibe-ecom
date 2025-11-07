const express = require('express');
const app = express();
const port = 3200;

// connect to mongodb
require('./config/db');

const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static('public'));


// routes
app.use('/api/products', require('./routes/productRoutes'));

app.use('/api/cart', require('./routes/cartRoutes'));

app.use('/api/checkout', require('./routes/checkoutRoutes'));

// start server
app.listen(port,()=>{
  console.log(`server is listening at port ${port}`);
});