/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        vendor: ['react', 'react-dom'],
        bundle: {
            import: './app',
            dependOn: 'vendor',
        },
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
};
