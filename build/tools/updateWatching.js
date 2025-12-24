import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { WatchingListItemSchema } from '../types/zod/backlogOutputDefinition.js';
const updateWatchingSchema = buildToolSchema((t) => ({
    watchId: z.number().describe(t('TOOL_UPDATE_WATCHING_WATCH_ID', 'Watch ID')),
    note: z
        .string()
        .describe(t('TOOL_UPDATE_WATCHING_NOTE', 'Updated note for the watch')),
}));
export const updateWatchingTool = (backlog, { t }) => {
    return {
        name: 'update_watching',
        description: t('TOOL_UPDATE_WATCHING_DESCRIPTION', 'Updates an existing watch note'),
        schema: z.object(updateWatchingSchema(t)),
        outputSchema: WatchingListItemSchema,
        handler: async ({ watchId, note }) => backlog.patchWatchingListItem(watchId, note),
    };
};
