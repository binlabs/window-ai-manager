# WindowAIManager

A library for managing AI text sessions in the browser using the `window.ai` API.

## Description

`WindowAIManager` is a JavaScript library (written in Typescript) designed to facilitate interactions with AI text sessions in the browser. It leverages the `window.ai` API, which is available in desktop versions of Chrome starting from version 127.0.6512.0. This library includes functionalities for creating, managing, and destroying AI text sessions, as well as rendering markdown text to HTML.

## Installation

To install the library, use npm:

```bash
npm install window-ai-manager
```

## Usage

### Basic Usage

```js
const WindowAIManager = require('window-ai-manager')
const aiManager = new WindowAIManager()

async function main() {
    // Check if a text session can be created
    const canCreate = await aiManager.canCreateSession()
    console.log('Can create session:', canCreate)

    // Create a new session
    if (canCreate !== 'no') {
        await aiManager.createSession('session1')
        console.log('Session created')

        // Send a prompt and get the response
        const response = await aiManager.prompt('session1', 'Write me a poem')
        console.log('AI Response:', response)

        // Send a streaming prompt
        await aiManager.promptStreaming('session1', 'Write me an extra-long poem', (chunk) => {
            console.log('Streaming chunk:', chunk)
        })

        // Destroy the session
        await aiManager.destroySession('session1')
        console.log('Session destroyed')
    }
}

main().catch(console.error)
```

### Markdown Rendering

```javascript
const WindowAIManager = require('window-ai-manager')
const aiManager = new WindowAIManager()

const markdown = '# Hello, world!'
const html = aiManager.renderMarkdown(markdown)
console.log('Rendered HTML:', html)
```

### Destroying All Sessions

```javascript
const WindowAIManager = require('window-ai-manager')
const aiManager = new WindowAIManager()

async function main() {
    await aiManager.createSession('session1')
    await aiManager.createSession('session2')

    // Destroy all sessions
    await aiManager.destroyAllSessions()
    console.log('All sessions destroyed')
}

main().catch(console.error)
```

## Requirements

This library only works in desktop versions of Chrome starting from version 127.0.6512.0. It uses the window.ai API, which is currently available only in development channel releases of Chrome.

## API

`canCreateSession(): Promise<'readily' | 'after-download' | 'no'>`
Checks if a text session can be created.

`createSession(sessionId: string): Promise<void>`
Creates a new text session with the given session ID.

`prompt(sessionId: string, text: string): Promise<string>`
Sends a prompt to the specified session and returns the response.

`promptStreaming(sessionId: string, text: string, onChunkReceived: (chunk: string) => void): Promise<string>`
Sends a streaming prompt to the specified session and processes the chunks received.

`destroySession(sessionId: string): Promise<void>`
Destroys the specified session and removes it from the map.

`destroyAllSessions(): Promise<void>`
Destroys all active sessions and clears the map.

`renderMarkdown(markdown: string): string`
Renders markdown text to HTML.

## License

This project is licensed under the MIT License.
