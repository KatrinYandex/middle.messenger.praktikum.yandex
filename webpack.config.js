const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'chat.bundle.js'
    },
    resolve: {
        extensions: [ '.ts', '.js', '.scss', '.hbs', '.json', '.css' ]
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') })],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    }],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-template-loader',
                        options: {
                            configFile: path.resolve(__dirname, './handlebars.config.js'),
                        },
                    }]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, './dist')
        }
    }
};
