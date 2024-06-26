import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './src/routes/book.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use('/api/v1/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});