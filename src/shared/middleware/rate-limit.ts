import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  // 5 minutes
  windowMs: 5 * 60 * 1000,

  // Limit each IP to 100 requests per windowMs
  limit: 100,
  message: 'Too many requests from this IP. Please try again later.',
});
