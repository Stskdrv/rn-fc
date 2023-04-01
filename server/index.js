const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).json({message: 'it is working'}));

app.listen(5000, () => console.log('Listening on 5000'));