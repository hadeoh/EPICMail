import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import messageRoutes from './routes/message';
import userRoutes from './routes/user';
import groupRoutes from './routes/group';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/messages', messageRoutes);

app.use('/api/v1/auth', userRoutes);

app.use('/api/v1/groups', groupRoutes);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'The API is functional',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
