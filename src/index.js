const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 8000,() => console.log(`Running on http://localhost:${process.env.PORT}`));
