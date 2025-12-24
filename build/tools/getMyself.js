import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { UserSchema } from '../types/zod/backlogOutputDefinition.js';
const getMyselfSchema = buildToolSchema((_t) => ({}));
export const getMyselfTool = (backlog, { t }) => {
    return {
        name: 'get_myself',
        description: t('TOOL_GET_MYSELF_DESCRIPTION', 'Returns information about the authenticated user'),
        schema: z.object(getMyselfSchema(t)),
        outputSchema: UserSchema,
        importantFields: ['id', 'userId', 'name', 'roleType'],
        handler: async () => backlog.getMyself(),
    };
};
