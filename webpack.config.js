var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        main: ['webpack-dev-server/client?http://0.0.0.0:8080/', 'webpack/hot/only-dev-server', './src/index.jsx'],
        react: ['react']
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
        library: '[name]'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        preLoaders: [
            {
                test: /(\.js$)|(\.jsx$)/,
                loaders: ['eslint'],
                include: [
                  path.resolve(__dirname, "src"),
                ],
                options: {
                	fix: true
                }
            }
        ],
        loaders: [
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?name=images/[name].[ext]'
            },
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
            }
        ]
    },

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: './dist',
        hot: true
    },

    plugins: [
    	new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	    }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            filename: 'react.js'
        }),
        new ExtractTextPlugin('style/style.min.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

    