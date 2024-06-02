class MockAITextSession implements AITextSession {
    async prompt(input: string): Promise<string> {
        return `Mock response to: ${input}`
    }

    async *promptStreaming(input: string): AsyncIterableIterator<string> {
        yield `Mock streaming response to: ${input}`
    }

    destroy(): void {
        console.log('Session destroyed')
    }

    clone(): AITextSession {
        throw new Error('Clone not implemented')
    }
}

class MockAI implements AI {
    async canCreateTextSession(): Promise<AIModelAvailability> {
        return 'readily'
    }

    async createTextSession(options?: AITextSessionOptions): Promise<AITextSession> {
        return new MockAITextSession()
    }

    async defaultTextSessionOptions(): Promise<AITextSessionOptions> {
        return {
            topK: 50,
            temperature: 0.7,
        }
    }
}

// Only polyfill if the AI API is not already available
if (!window.ai) {
    ;(window as any).ai = new MockAI()
}
