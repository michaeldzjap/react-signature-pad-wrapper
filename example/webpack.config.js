import path from 'path';

export default {
    mode: 'development',
    entry: {
        bundle: './app',
        vendor: ['react', 'react-dom', 'prop-types'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                    cacheDirectory: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'cheap-module-eval-source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true,
                },
            },
        },
        runtimeChunk: {
            name: 'manifest',
        },
        noEmitOnErrors: true,
    },
};
