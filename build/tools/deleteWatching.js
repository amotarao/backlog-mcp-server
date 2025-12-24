import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { WatchingListItemSchema } from '../types/zod/backlogOutputDefinition.js';
const deleteWatchingSchema = buildToolSchema((t) => ({
    watchId: z
        .number()
        .describe(t('TOOL_DELETE_WATCHING_WATCH_ID', 'Watch ID to delete')),
}));
export const deleteWatchingTool = (backlog, { t }) => {
    return {
        name: 'delete_watching',
        description: t('TOOL_DELETE_WATCHING_DESCRIPTION', 'Deletes a watch from an issue'),
        schema: z.object(deleteWatchingSchema(t)),
        outputSchema: WatchingListItemSchema,
        handler: async ({ watchId }) => backlog.deletehWatchingListItem(watchId),
    };
};
