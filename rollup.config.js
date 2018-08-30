import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import {uglify} from 'rollup-plugin-uglify';

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/react-signature-pad-wrapper.min.js',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [
            eslint(),
            babel({
                exclude: 'node_modules/**',
                plugins: [
                    '@babel/plugin-external-helpers',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-proposal-class-properties',
                ],
                runtimeHelpers: true
            }),
            commonjs(),
            resolve({
                jsnext: true,
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            uglify()
        ],
        external: ['react', 'prop-types']
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/react-signature-pad-wrapper.js',
            format: 'cjs'
        },
        plugins: [
            eslint(),
            babel({
                exclude: 'node_modules/**',
                plugins: [
                    '@babel/plugin-external-helpers',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-proposal-class-properties',
                ],
                runtimeHelpers: true
            }),
            commonjs(),
            resolve({
                jsnext: true,
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
        ],
        external: ['react', 'prop-types']
    }
];
