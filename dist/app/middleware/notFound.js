"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = ((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Route Not Found',
        statusCode: 404,
        error: `The request endpoint ${req.originalUrl} does not exists.`,
    });
});
exports.default = notFound;
