import { marked } from 'marked'
import './polyfill'

/**
 * Manages AI text sessions in the browser using the window.ai API.
 */
class WindowAIManager {
    private sessions: Map<string, AITextSession>

    constructor() {
        this.sessions = new Map<string, AITextSession>()
    }

    /**
     * Checks if a text session can be created.
     * @returns {Promise<string>} One of "readily", "after-download", or "no".
     */
    async canCreateSession(): Promise<'readily' | 'after-download' | 'no'> {
        const canCreate = await window.ai.canCreateTextSession()
        return canCreate
    }

    /**
     * Creates a new text session with the given sessionId.
     * @param {string} sessionId - The unique identifier for the session.
     * @throws {Error} If the model is not available on this device.
     */
    async createSession(sessionId: string): Promise<void> {
        const canCreate = await this.canCreateSession()
        if (canCreate === 'no') {
            throw new Error('Cannot create session: model not available on this device.')
        }
        const session = await window.ai.createTextSession()
        this.sessions.set(sessionId, session)
    }

    /**
     * Sends a prompt to the specified session and returns the response.
     * @param {string} sessionId - The unique identifier for the session.
     * @param {string} text - The prompt text to send to the model.
     * @returns {Promise<string>} The response from the model.
     * @throws {Error} If the session with the given ID is not found.
     */
    async prompt(sessionId: string, text: string): Promise<string> {
        const session = this.sessions.get(sessionId)
        if (!session) {
            throw new Error(`Session with ID ${sessionId} not found. Call createSession() first.`)
        }
        return await session.prompt(text)
    }

    /**
     * Sends a streaming prompt to the specified session and processes the chunks received.
     * @param {string} sessionId - The unique identifier for the session.
     * @param {string} text - The prompt text to send to the model.
     * @param {function} onChunkReceived - Callback function to handle each chunk received.
     * @returns {Promise<string>} The final concatenated result from the model.
     * @throws {Error} If the session with the given ID is not found.
     */
    async promptStreaming(sessionId: string, text: string, onChunkReceived: (chunk: string) => void): Promise<string> {
        const session = this.sessions.get(sessionId)
        if (!session) {
            throw new Error(`Session with ID ${sessionId} not found. Call createSession() first.`)
        }
        const stream = session.promptStreaming(text)
        let result = ''
        let previousLength = 0
        for await (const chunk of stream) {
            const newContent = chunk.slice(previousLength)
            onChunkReceived(newContent)
            previousLength = chunk.length
            result += newContent
        }
        return result
    }

    /**
     * Destroys the specified session and removes it from the map.
     * @param {string} sessionId - The unique identifier for the session.
     * @throws {Error} If the session with the given ID is not found.
     */
    async destroySession(sessionId: string): Promise<void> {
        const session = this.sessions.get(sessionId)
        if (session) {
            session.destroy()
            this.sessions.delete(sessionId)
        } else {
            throw new Error(`Session with ID ${sessionId} not found.`)
        }
    }

    /**
     * Destroys all active sessions and clears the map.
     */
    async destroyAllSessions(): Promise<void> {
        for (const [_sessionId, session] of this.sessions) {
            session.destroy()
        }
        this.sessions.clear()
    }

    /**
     * Renders markdown text to HTML.
     * @param {string} markdown - The markdown text to render.
     * @returns {string} The rendered HTML.
     */
    renderMarkdown(markdown: string): string | Promise<string> {
        return marked(markdown)
    }
}

export default WindowAIManager
