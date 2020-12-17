const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpuckPlugin=require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.MODE_ENV === 'development'
const isProd = !isDev

const optimization =() =>{
    const config ={
        splitChunks:{
            chunks:'all'
        }
    }
    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetsWebpuckPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
}

const jsLoaders = () =>{
    const loaders = [{
        loader:'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }]
    if(isDev){
        loaders.push('eslint-loader')
    }
    return loaders;
}

module.exports={
    context:path.resolve(__dirname,'src'),
    entry:['@babel/polyfill','./index.js'],
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'src/assets/images/'), to: path.resolve(__dirname, 'dist/assets/images')
                }
              ]
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            options:{
                hmr:isDev,
                reloadAll:true
            }
        })
    ],
    optimization: optimization(),
    devServer:{
        port: 4200,
        hot:isDev
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test:/\.s[ac]ss$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
            },
            {
                test:/\.(png|jpg|svg|gif)/,
                loader:'file-loader',
                options:{
                    name:'images/[name].[ext]'
                }
            },
            {
                test:/\.(ttf|woff|woff2|eot)/,
                loader:'file-loader',
                options:{
                    name:'fonts/[name].[ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
              }
        ]
    }
}