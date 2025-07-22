import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

import type { MViewConfig } from '#src/core';

declare global {
  namespace Express {
    interface Request {
      validatedBody?: MViewConfig;
      validatedParams?: ParamsDictionary;
      validatedQuery?: ParsedQs;
    }
  }
}
