// This express app is used to serve the built static files on Heroku
const express = require('express');

const app = express();

app.use(express.static('./dist/soundhive-front'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/soundhive-front' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)
