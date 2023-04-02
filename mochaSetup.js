const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<div id="main"></div>', {
    url: 'http://localhost:3000'
});
global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.hbs'] = function (module, filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    module.exports = Handlebars.compile(content);
}

require.extensions['.scss'] = function () {
    module.exports = {};
}
