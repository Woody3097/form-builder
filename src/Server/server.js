const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const api = require('./routes/api');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.get('/', (req, res) => {
    res.send('Getted');
});

app.listen(PORT, () => console.log('Run on' + PORT));
