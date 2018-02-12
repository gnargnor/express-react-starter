const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const getIfUtils = require('webpack-config-utils').getIfUtils;
const {ifProduction} = getIfUtils(process.env.NODE_ENV || 'development');

const createManifest = new ManifestPlugin({
    reduce: function(manifest, file) {
        manifest[`${file.name.replace(/\./g, '_')}`] = file.path;
        return manifest;
    }
});

module.exports = {
    devtool: ifProduction() ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: {
        main: [
            'babel-polyfill',
            './frontend/app.js'
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve('public'),
        filename: ifProduction() ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {modules: false}],
                            'react'
                        ],
                        plugins: ['transform-object-rest-spread']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.(tff|eot|woff|woff2|svg|png|jpg)$/,
                use: 'url-loader?limit=100000&name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        createManifest
    ]
};

if (ifProduction()) {
    module.exports.plugins.push(new UglifyJSPlugin({sourceMap: true}));
} else {
    Object.keys(module.exports.entry).forEach(key => {
        module.exports.entry[key].unshift('react-hot-loader/patch');
        module.exports.entry[key].unshift('webpack-hot-middleware/client?reload=true');
    });
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}