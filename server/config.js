import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3030
export const MONGO_URI =
    process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/movies-db'

export const CHROMA_ENV = {
    URI: process.env.CHROMA_DB_URI || 'http://chromadb-server:8000',
    CREDENTIALS: process.env.CHROMA_DB_CREDENTIALS,
    AUTH_PROVIDER: process.env.CHROMA_DB_AUTH_PROVIDER,
}

export const PH_CONFIG = {
    PH_KEY:
        process.env.REACT_APP_PUBLIC_POSTHOG_KEY ||
        'phc_XNPj4LP10TUTzI3FthGr1W6wvhvCZerBmK8ZihUfPv',
    PH_HOST:
        process.env.REACT_APP_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
}

export const NODE_ENV = process.env.NODE_ENV || 'staging'

export const isProd = NODE_ENV === 'production'

export const PUBLIC_DOMAIN = process.env.RAILWAY_PUBLIC_DOMAIN || ''
