const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nunjucks = require('nunjucks');
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin");
const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');
// const nunjucksOptions = JSON.stringify({
//     searchPaths: basePath + '/resources/html/',
//     context: nunjucksContext
// });
module.exports = {
    entry: {
        main: ".app.js",
        // vendor: "./src/vendor.js"
    },
    output: {
        path: __dirname + '/dist',
        filename: "assets/js/[name].js",
        library: "MainModule",
    },
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },
            // NUNJUCKS
            // {
            //     test: /\.(njk|nunjucks)$/,
            //     loader: ['html-loader', `nunjucks-html-loader?${nunjucksOptions}`]
            // },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/templates/index.html'
        // }),
        new NunjucksWebpackPlugin({
            templates: [
                {
                    from: "./src/templates/index.njk",
                    to: "index.html"
                },
                // {
                //     from: "templates/anotherpage.njk",
                //     to: "anotherpage.html"
                // }
            ]
        }),
        // new MiniCssExtractPlugin({
        //      filename: "assets/css/[name].css",
        // })
    ]
};