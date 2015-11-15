module.exports = {
    entry: {
        web: [
            './src/index.js',
            './src/index.html',
            './src/style.css',
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
        ],
        electron: [
            './src/entry.js',
            './package.json'
        ]
    },
    output: {
        path: __dirname + "/build",
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                loader: 'babel' 
            }, 
            {
                test: /bootstrap.*\.(css|woff2)$/,
                loader: "file-loader?name=[path][name].[ext]&context=node_modules/bootstrap/dist"
            },
            {
                test: /src(\/|\\).*\.(html|css)$/,
                loader: "file-loader?name=[path][name].[ext]&context=src"
            },
            {
                test: /src(\/|\\)entry\.js$/,
                loader: "file-loader?name=[path][name].[ext]&context=src"
            },
            {
                test: /package\.json$/,
                loader: "file-loader?name=[path][name].[ext]"
            },
        ]
    }
};
