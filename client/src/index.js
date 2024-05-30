import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { CONFIG } from './utils/analyticsConstants.js'

posthog.init(CONFIG.PH_KEY, {
    api_host: CONFIG.PH_HOST,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <PostHogProvider client={posthog}>
            <App />
        </PostHogProvider>
    </React.StrictMode>
)
