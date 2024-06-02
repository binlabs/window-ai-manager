// ai.d.ts

interface AITextSession {
    prompt(input: string): Promise<string>
    promptStreaming(input: string): AsyncIterableIterator<string>
    destroy(): void
    clone(): AITextSession // Not yet implemented
}

interface AITextSessionOptions {
    topK?: number
    temperature?: number
}

type AIModelAvailability = 'readily' | 'after-download' | 'no'

interface AI {
    canCreateTextSession(): Promise<AIModelAvailability>
    createTextSession(options?: AITextSessionOptions): Promise<AITextSession>
    defaultTextSessionOptions(): Promise<AITextSessionOptions>
}

interface Window {
    ai: AI
}
