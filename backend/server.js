const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 5000;
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
// const multer = require('multer');
const productRoutes = require('./routes/products.js');
const userRoutes = require('./routes/users.js');
const auth = require('./routes/auth');
const upload = require('./routes/upload');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
dotenv.config();
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

const store = new MongoDBStore({
  uri: process.env.DATABASE_ACCESS,
  collection: 'sessions',
});

app.use(
  session({
    secret: 'secret',
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.set('strictQuery', false);
try {
  mongoose.connect(
    process.env.DATABASE_ACCESS,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'jewerelly' },
    () => console.log('Database Connected')
  );
} catch (error) {
  console.log(error.message);
}
app.use('/upload', upload);
app.use('/auth', auth);
app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.listen(port, () => console.log(`Server started at port ${port}`));
