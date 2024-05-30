import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
console.log(process.env.REACT_APP_PUBLIC_POSTHOG_KEY)
posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <PostHogProvider client={posthog}>
            <App />
        </PostHogProvider>
    </React.StrictMode>
)
