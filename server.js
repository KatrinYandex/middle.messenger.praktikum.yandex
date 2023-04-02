const express = require('express');
const fallback = require('express-history-api-fallback');
const open = require('open');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const root = path.join(__dirname, '/dist')
app.use(express.static(root));
app.use(fallback(path.join(__dirname, '/dist/index.html')))

open('http://localhost:' + String(PORT));
app.listen(PORT);
