const Analytics = {
    capture: (event, data = {}) => window.posthog.capture(event, data),
}

export const EVENTS = {
    COOL_SEARCH: 'Semantic Search',
    SEARCH: 'Normal Search',
}

export default Analytics
