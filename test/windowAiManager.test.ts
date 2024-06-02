import { describe, it, expect } from 'vitest'
import WindowAIManager from '../src/index'

describe('WindowAIManager', () => {
    it('should check if a text session can be created', async () => {
        const manager = new WindowAIManager()
        const canCreate = await manager.canCreateSession()
        expect(canCreate).toBe('readily')
    })

    it('should create a new text session and send a prompt', async () => {
        const manager = new WindowAIManager()
        await manager.createSession('session1')
        const result = await manager.prompt('session1', 'Write me a poem')
        expect(result).toBe('Mock response to: Write me a poem')
    })

    it('should send a streaming prompt and process the chunks received', async () => {
        const manager = new WindowAIManager()
        await manager.createSession('session2')
        const receivedChunks: string[] = []
        const result = await manager.promptStreaming('session2', 'Write me an extra-long poem', (chunk) => {
            receivedChunks.push(chunk)
        })
        expect(result).toBe('Mock streaming response to: Write me an extra-long poem')
        expect(receivedChunks).toEqual(['Mock streaming response to: Write me an extra-long poem'])
    })

    it('should destroy a session and handle prompt errors correctly', async () => {
        const manager = new WindowAIManager()
        await manager.createSession('session3')
        await manager.destroySession('session3')
        try {
            await manager.prompt('session3', 'This should fail')
        } catch (error: any) {
            expect(error.message).toBe('Session with ID session3 not found. Call createSession() first.')
        }
    })

    it('should destroy all active sessions', async () => {
        const manager = new WindowAIManager()
        await manager.createSession('session4')
        await manager.createSession('session5')
        await manager.destroyAllSessions()
        try {
            await manager.prompt('session4', 'This should fail')
        } catch (error: any) {
            expect(error.message).toBe('Session with ID session4 not found. Call createSession() first.')
        }
        try {
            await manager.prompt('session5', 'This should fail')
        } catch (error: any) {
            expect(error.message).toBe('Session with ID session5 not found. Call createSession() first.')
        }
    })

    it('should render markdown text to HTML', () => {
        const manager = new WindowAIManager()
        const markdown = '# Hello, world!'
        const html = manager.renderMarkdown(markdown)
        expect(html).toBe('<h1>Hello, world!</h1>\n')
    })
})
