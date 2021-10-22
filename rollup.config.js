import commonjs from '@rollup/plugin-commonjs';
// import eslint from '@rollup/plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        { file: pkg.main, format: 'cjs', sourcemap: true, exports: 'named' },
        { file: pkg.module, format: 'es', sourcemap: true },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // eslint(),
        typescript({
            typescript: require('typescript'),
        }),
        commonjs(),
        nodeResolve(),
        sourceMaps(),
        terser(),
    ],
};
