const express = require('express');
import fallback from 'express-history-api-fallback';
const open = require('open');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const root = path.join(__dirname + '/dist')
app.use(express.static(root));
app.use(fallback('index.html', { root }))

open('http://localhost:' + String(PORT));
app.listen(PORT);
