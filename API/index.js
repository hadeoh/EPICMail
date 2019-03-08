import express from 'express';

const app = express();

const PORT = 5001;

app.get('/', (req, res) => {
    return res.send('The API is functional');
});

app.listen(PORT, () => {
    console.log("Server is running on port $[PORT]");
})