var colors = require('colors/safe');

// set theme
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: ['yellow', 'bold'],
    debug: 'blue',
    error: ['red', 'bold']
});

module.exports = colors;