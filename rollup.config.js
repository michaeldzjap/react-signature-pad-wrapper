import commonjs from '@rollup/plugin-commonjs';
// import eslint from '@rollup/plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const local = process.env.NODE_ENV === 'local';

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: './',
            entryFileNames: pkg.main,
            format: 'cjs',
            sourcemap: local,
            exports: 'named',
        },
        {
            dir: './',
            entryFileNames: pkg.module,
            format: 'es',
            sourcemap: local,
        },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // eslint(),
        typescript({
            typescript: require('typescript'),
            sourceMap: local,
            declaration: true,
            declarationDir: 'dist/',
            rootDir: 'src/',
        }),
        commonjs(),
        nodeResolve(),
        terser(),
    ],
};
