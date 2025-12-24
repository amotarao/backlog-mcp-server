import { isErrorLike } from '../../types/result.js';
/**
 * Convert SafeResult<T> to CallToolResult
 */
export function wrapWithToolResult(fn) {
    return async (input, _extra) => {
        const result = await fn(input);
        if (isErrorLike(result)) {
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: result.message,
                    },
                ],
            };
        }
        const data = result.data;
        if (typeof data === 'string') {
            return {
                content: [
                    {
                        type: 'text',
                        text: data,
                    },
                ],
            };
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    };
}
