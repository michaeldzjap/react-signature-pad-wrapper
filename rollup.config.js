import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json';

const base = {
    input: 'src/index.js',
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    watch: {
        include: 'src/**',
    },
    plugins: [
        eslint(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
            inputSourceMap: true,
            sourceMaps: true,
        }),
        commonjs(),
        nodeResolve(),
    ],
};

export default [
    {
        ...base,
        ...{
            output: {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'default',
            },
            plugins: [...base.plugins, uglify()],
        },
    },
    {
        ...base,
        ...{
            output: {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
                exports: 'default',
            },
            plugins: [...base.plugins, terser()],
        },
    },
];
