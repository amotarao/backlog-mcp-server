import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { ResolutionSchema } from '../types/zod/backlogOutputDefinition.js';
const getResolutionsSchema = buildToolSchema((_t) => ({}));
export const getResolutionsTool = (backlog, { t }) => {
    return {
        name: 'get_resolutions',
        description: t('TOOL_GET_RESOLUTIONS_DESCRIPTION', 'Returns list of issue resolutions'),
        schema: z.object(getResolutionsSchema(t)),
        outputSchema: ResolutionSchema,
        handler: async () => backlog.getResolutions(),
    };
};
