module.exports = {
    context: __dirname + '/src',

    entry: {
        app: './app.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    __dirname + '/src'
                ],
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015'
                    ]
                },
                plugins: [
                    'transform-object-assign'
                ]
            }
        ]
    }
};
