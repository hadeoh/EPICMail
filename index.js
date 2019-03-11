import express from 'express';

import bodyParser from 'body-parser';

import messageRoutes from './API/routes/message';

const app = express();

const PORT = 5001;

app.use(bodyParser.json());

app.use('/api/v1/messages', messageRoutes);

app.get('/', (req, res) => {
    return res.send('The API is functional');
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})