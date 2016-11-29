var colors = require('colors/safe');

// set theme
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'blue',
    data: 'grey',
    help: 'cyan',
    warn: ['yellow', 'bold'],
    debug: 'cyan',
    error: ['red', 'bold']
});

module.exports = colors;