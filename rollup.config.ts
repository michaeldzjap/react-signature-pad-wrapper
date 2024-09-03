import { readFileSync } from 'fs';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
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
        typescript({
            sourceMap: local,
        }),
        commonjs(),
        nodeResolve(),
        terser(),
    ],
};
