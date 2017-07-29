import path from 'path';
import webpack from 'webpack';

export default {
    entry: {
        bundle: './example/app',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'example/build'),
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ],
    devtool: 'cheap-module-eval-source-map'
};
