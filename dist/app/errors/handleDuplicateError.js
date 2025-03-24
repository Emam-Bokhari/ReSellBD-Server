'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];
  const error = [
    {
      path: '',
      message: `${extractMessage} is already exist!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Key Error: Conflict with an existing entry.',
    error,
  };
};
exports.handleDuplicateError = handleDuplicateError;
