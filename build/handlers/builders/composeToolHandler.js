/* eslint-disable @typescript-eslint/no-explicit-any */
import { wrapWithErrorHandling } from '../transformers/wrapWithErrorHandling.js';
import { wrapWithFieldPicking } from '../transformers/wrapWithFieldPicking.js';
import { wrapWithTokenLimit } from '../transformers/wrapWithTokenLimit.js';
import { wrapWithToolResult } from '../transformers/wrapWithToolResult.js';
import { z } from 'zod';
import { generateFieldsDescription } from '../../utils/generateFieldsDescription.js';
export function composeToolHandler(tool, options) {
    const { useFields, errorHandler, maxTokens } = options;
    // Step 1: Add `fields` to schema if needed
    if (useFields) {
        const fieldDesc = generateFieldsDescription(tool.outputSchema, tool.importantFields ?? [], tool.name);
        tool.schema = extendSchema(tool.schema, fieldDesc);
    }
    // Step 2: Compose
    let handler = wrapWithErrorHandling(tool.handler, errorHandler);
    if (useFields) {
        handler = wrapWithFieldPicking(handler);
    }
    return wrapWithToolResult(wrapWithTokenLimit(handler, maxTokens));
}
function extendSchema(schema, desc) {
    return schema.extend({
        fields: z.string().describe(desc),
    });
}
