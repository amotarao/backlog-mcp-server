/**
 * Runs a tool handler safely, catching any errors and converting to SafeResult.
 * The `onError` handler defines how to turn unknown errors into ErrorLike objects.
 */
export function runToolSafely(fn, onError) {
    return async (input) => {
        try {
            const data = await fn(input);
            return { kind: 'ok', data };
        }
        catch (err) {
            if (onError) {
                return onError(err);
            }
            return { kind: 'error', message: 'Unknown: ' + err };
        }
    };
}
