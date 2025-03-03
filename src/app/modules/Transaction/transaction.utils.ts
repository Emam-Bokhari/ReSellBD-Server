import crypto from 'crypto';

export const generateTransactionId = () => {
  const prefix = 'TXN';
  const timestamp = Date.now();
  const randomId = crypto.randomBytes(4).toString('hex');
  return `${prefix}-${timestamp}-${randomId}`;
};
