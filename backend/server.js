const dotenv = require('dotenv').config();
const port = process.env.PORT || 3001;
const express = require('express');

const errorHandler = require('./middleware/errorMiddleware');
const todoRouter = require('./routes/todoRoutes');
const userRouter = require('./routes/userRoutes');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter);
app.use('/todos', todoRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on the port ${port}`));