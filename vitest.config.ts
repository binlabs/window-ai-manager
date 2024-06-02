// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./test/setupTests.ts'],
        coverage: {
            provider: 'v8',
        },
    },
})
