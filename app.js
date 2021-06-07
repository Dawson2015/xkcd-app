const path = require('path');
const render = require('./pageFormatter');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
app.set('port', port);
app.use(express.static(path.resolve('style')));

app.get('*', function(req, res) {
  render(req, res);
});

app.listen(app.get('port'));
console.log(`Listening port ${app.get('port')}...`);