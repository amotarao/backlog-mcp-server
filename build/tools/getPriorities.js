import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { PrioritySchema } from '../types/zod/backlogOutputDefinition.js';
const getPrioritiesSchema = buildToolSchema((_t) => ({}));
export const getPrioritiesTool = (backlog, { t }) => {
    return {
        name: 'get_priorities',
        description: t('TOOL_GET_PRIORITIES_DESCRIPTION', 'Returns list of priorities'),
        schema: z.object(getPrioritiesSchema(t)),
        outputSchema: PrioritySchema,
        handler: async () => backlog.getPriorities(),
    };
};
