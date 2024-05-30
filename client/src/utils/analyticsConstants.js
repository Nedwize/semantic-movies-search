export const EVENTS = {
    COOL_SEARCH: 'Semantic Search',
    SEARCH: 'Normal Search',
}

export const CONFIG = {
    PH_KEY:
        process.env.REACT_APP_PUBLIC_POSTHOG_KEY ||
        'phc_XNPj4LP10TUTzI3FthGr1W6wvhvCZerBmK8ZihUfPv',
    PH_HOST:
        process.env.REACT_APP_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
}
