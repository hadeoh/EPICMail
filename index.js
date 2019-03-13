import express from 'express';

import bodyParser from 'body-parser';

import messageRoutes from './API/routes/message';

import userRoutes from './API/routes/user';

const app = express();

const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());

app.use('/api/v1/messages', messageRoutes);

app.use('/api/v1/auth', userRoutes);

app.get('/', (req, res) => res.send('The API is functional'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
