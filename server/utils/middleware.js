import rateLimit from 'express-rate-limit'

export const unknownEndpoint = (_, res) => {
    res.status(404).json({ error: 'unknown endpoint' })
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
    if (err.name === 'ValidationError') {
        err.status = 400
    }
    if (
        err.name === 'MongoServerError' &&
        err.message.includes('duplicate key error')
    ) {
        err.status = 400
    }
    const errStatus = err.status || 500
    const logMessage = errStatus >= 500 ? err : err.message
    console.log(logMessage, err.props || '')
    const errMessage = errStatus >= 500 ? 'internal server error' : err.message
    const responseObj = { error: errMessage, details: '' }
    if (err.props) {
        responseObj.details = err.props
    }
    res.status(errStatus).json(responseObj)
}

export const limiter = (minutes, limit) =>
    rateLimit({
        windowMs: minutes * 60 * 1000,
        max: limit,
        message: 'Too many requests, please try again later.\n',
    })
