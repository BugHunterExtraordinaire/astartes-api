require('dotenv').config({
  quiet: true
});

const express = require('express');
const app = express();
const connectDB = require('./database/connect');

const astartesRouter = require('./routes/astartes');

app.use(express.json());

app.use('/api/v1/marines', astartesRouter);

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