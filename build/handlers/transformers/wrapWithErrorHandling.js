import { runToolSafely } from '../../utils/runToolSafely.js';
export function wrapWithErrorHandling(fn, onError) {
    return runToolSafely(fn, onError);
}
