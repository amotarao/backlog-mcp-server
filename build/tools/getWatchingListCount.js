import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { WatchingListCountSchema } from '../types/zod/backlogOutputDefinition.js';
const getWatchingListCountSchema = buildToolSchema((t) => ({
    userId: z
        .number()
        .describe(t('TOOL_GET_WATCHING_LIST_COUNT_USER_ID', 'User ID')),
}));
export const getWatchingListCountTool = (backlog, { t }) => {
    return {
        name: 'get_watching_list_count',
        description: t('TOOL_GET_WATCHING_LIST_COUNT_DESCRIPTION', 'Returns count of watching items for a user'),
        schema: z.object(getWatchingListCountSchema(t)),
        outputSchema: WatchingListCountSchema,
        handler: async ({ userId }) => backlog.getWatchingListCount(userId),
    };
};
