import { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}

export default error;