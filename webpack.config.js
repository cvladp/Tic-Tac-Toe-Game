const path = require('path');
const publicFolder = 'public';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        main: './src/project/index.ts'
    },
    output: {
        path: path.join(__dirname, publicFolder),
        filename: './js/[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(path.join(__dirname, 'node_modules'))]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true
    },
    externals: {
        // "pixi.js": {
        //     root: 'PIXI'
        // },
        // "pixi-spine": {
        //     root: 'PIXI.spine'
        // },
        "puremvc": {
            root: "puremvc"
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'node_modules/pixi.js/dist/pixi.js'),
                to: path.join(__dirname, publicFolder, "js")
            },
            // {
            //     from: path.join(__dirname, 'node_modules/pixi-spine/bin/pixi-spine.js'),
            //     to: path.join(__dirname, publicFolder, "js")
            // },
            {
                from: path.join(__dirname, 'node_modules/puremvc/lib/puremvc-1.0.1.js'),
                to: path.join(__dirname, publicFolder, "js")
            },
            {
                from: path.join(__dirname, 'src/assets'),
                to: path.join(__dirname, publicFolder, "assets")
            }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    },

    mode: "development"

};
