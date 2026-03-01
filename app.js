require('dotenv').config({
  quiet: true
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const { rateLimit } = require('express-rate-limit');
const connectDB = require('./database/connect');
const handleError = require('./middleware/handleError');

const marineRouter = require('./routes/marine');

app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
	ipv6Subnet: 56
}));

app.use(express.json());

app.use('/api/v1/marines', marineRouter);

app.use(handleError);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();