const path = require('path');

module.exports = {
    mode: 'development',
    entry: './includes/js/app.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js'
    },

    mode: 'development'
};
