const express = require('express');
const open = require('open');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// const indexArgv = process.argv.indexOf("--port");
// const PORT = (indexArgv > -1) ? process.argv[indexArgv + 1] : 3000;

app.use(express.static(path.join(__dirname + '/dist')));

open('http://localhost:' + String(PORT));
app.listen(PORT);
