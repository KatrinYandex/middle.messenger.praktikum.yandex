const express = require('express');
const open = require('open');

const app = express();
const PORT = process.env.PORT || 3000;

// const indexArgv = process.argv.indexOf("--port");
// const PORT = (indexArgv > -1) ? process.argv[indexArgv + 1] : 3000;

app.use(express.static(__dirname + '/dist'));

open("http://localhost:" + PORT);
app.listen(PORT, function () {
    console.log(`Messenger is listening on port ${PORT}!`);
});

