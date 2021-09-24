// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: './app',
        vendor: ['react', 'react-dom'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devtool: 'eval-cheap-module-source-map',
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
        emitOnErrors: false,
    },
};
