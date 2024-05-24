import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3030
export const MONGO_URI =
    process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/movies-db'

export const NODE_ENV = process.env.NODE_ENV || 'staging'

export const isProd = NODE_ENV === 'production'

export const PUBLIC_DOMAIN = process.env.RAILWAY_PUBLIC_DOMAIN || ''
