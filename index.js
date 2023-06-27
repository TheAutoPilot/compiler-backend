const express = require('express');
const app = express();
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/api/run-code', async (req, res) => {
  console.log('the code from FE',req.body.code);
  const { code } = req.body;
  const language = 'py';
  const input = '';

  const data = qs.stringify({
    code,
    language,
    input,
  });

  const config = {
    method: 'post',
    url: 'https://api.codex.jaagrav.in',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = 8000; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
