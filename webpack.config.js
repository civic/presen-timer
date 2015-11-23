module.exports = {
    entry: {
        web: [
            './src/index.js',
            './src/index.html',
            './src/style.css',
            './src/background.js',
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
        ],
        electron: [
            './src/entry.js',
            './package.json'
        ],
        chromeapp: [
            './src/background.js',
            './manifest.json',
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
                test: /\.(css|woff2)$/,
                include: /node_modules(\/|\\)bootstrap\//,
                loader: "file-loader?name=[path][name].[ext]&context=node_modules/bootstrap/dist"
            },
            {
                test: /\.(html|css)$/,
                include: /src/,
                loader: "file-loader?name=[path][name].[ext]&context=src"
            },
            {
                test: /(entry.js|background.js)$/,
                include: /src/,
                loader: "file-loader?name=[path][name].[ext]&context=src"
            },
            {
                test: /(package.json|manifest.json)$/,
                loader: "file-loader?name=[path][name].[ext]"
            },
        ]
    }
};
