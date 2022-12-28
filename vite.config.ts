/// <reference types="vitest" />
import { defineVitConfig } from '@zardoy/vit'

export default defineVitConfig({
    test: {
        environment: 'jsdom',
    },
})
