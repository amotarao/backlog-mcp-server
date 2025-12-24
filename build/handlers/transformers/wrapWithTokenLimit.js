import { countTokens } from '../../utils/tokenCounter.js';
export function wrapWithTokenLimit(fn, maxTokens) {
    return async (input) => {
        const result = await fn(input);
        if (result == null ||
            typeof result !== 'object' ||
            result.kind == 'error') {
            return result;
        }
        const fullText = JSON.stringify(result.data, null, 2);
        const tokenCount = countTokens(fullText);
        if (tokenCount > maxTokens) {
            const roughCut = fullText.slice(0, Math.floor(maxTokens * 4));
            return {
                kind: 'ok',
                data: `${roughCut}\n...(output truncated due to token limit)`,
            };
        }
        return { kind: 'ok', data: fullText };
    };
}
