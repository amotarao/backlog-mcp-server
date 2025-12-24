import { parseBacklogAPIError } from './parseBacklogAPIError.js';
export const backlogErrorHandler = (err) => {
    const parsed = parseBacklogAPIError(err);
    return {
        kind: 'error',
        message: parsed.message,
    };
};
