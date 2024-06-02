// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/window-ai-manager.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        resolve({
            extensions: ['.js', '.ts'],
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
        }),
    ],
}
