import path from 'path';

export default {
    mode: 'development',
    entry: {
        bundle: './app',
        vendor: ['react', 'react-dom', 'prop-types']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
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
    devtool: 'cheap-module-eval-source-map',
    optimization: {
        splitChunks: {
            name: 'vendor',
            minChunks: 2
        },
        noEmitOnErrors: true
    }
};
