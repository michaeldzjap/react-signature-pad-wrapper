import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sourceMaps from 'rollup-plugin-sourcemaps';
import {eslint} from 'rollup-plugin-eslint';
import {uglify} from 'rollup-plugin-uglify';
import {terser} from 'rollup-plugin-terser';

import pkg from './package.json';

const base = {
    input: 'src/index.js',
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    watch: {
        include: 'src/**'
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
        resolve(),
        sourceMaps()
    ]
};

export default [
    {
        ...base,
        ...{
            output: {file: pkg.main, format: 'cjs', sourcemap: true},
            plugins: [...base.plugins, uglify()]
        }
    },
    {
        ...base,
        ...{
            output: {file: pkg.module, format: 'es', sourcemap: true},
            plugins: [...base.plugins, terser()]
        }
    }
];
