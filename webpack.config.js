const path = require('path');
const glob = require('glob');
const NunjucksWebpackPlugin = require("nunjucks-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const pages = glob.sync('**/*.njk',{
    cwd: path.join(__dirname,'src/templates/pages/'),}).map(page=>{
        return {
            from: `src/templates/pages/${page}`,
            to: `${page.split(".",1)}.html`
        }
    })


module.exports = {
    entry: {
        main:['./main.js','./src/assets/scss/styles.scss']
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
                  test: /\.(sa|sc|c)ss$/,
                  use: [
                      MiniCssExtractPlugin.loader,
                      'css-loader',
                      'sass-loader',
                  ]
              }, 
            // NUNJUCKS
            {
                test: /\.(njk|nunjucks)$/,
                loader: `nunjucks-loader`
            },

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
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                cache:true,
                parallel:true,
                uglifyOptions:{
                    compress:{
                        inline:true
                    },
                    ecma:6,
                    mangle:true
                },
                sourceMap:true
            })
        ],
        runtimeChunk:false
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/templates/index.html'
        // }),
        new NunjucksWebpackPlugin({
            templates: [...pages]
        }),
        new MiniCssExtractPlugin({
             filename: "assets/css/[name].css",
             chunkFilename:'assets/css/[name].[hash].css'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    devServer:{
        contentBase:'./dist',
        port:3000
    }
};