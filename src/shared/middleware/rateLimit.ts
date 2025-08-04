import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  // 1 minute
  windowMs: 1 * 60 * 1000,

  // Limit each IP to 150 requests per windowMs
  // TODO: Find optimal limit rate for prod
  limit: 500,
  message: 'Too many requests from this IP. Please try again later.',
});
