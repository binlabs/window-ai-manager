// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/window-ai-manager.cjs.js',
            format: 'cjs',
            exports: 'auto',
            sourcemap: true,
        },
        {
            file: 'dist/window-ai-manager.esm.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve({
            extensions: ['.js', '.ts'],
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
        }),
        terser(),
    ],
}
