import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'default',
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            exports: 'default',
        },
    ],
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
        terser(),
    ],
};
