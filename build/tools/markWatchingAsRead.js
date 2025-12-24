import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
const markWatchingAsReadSchema = buildToolSchema((t) => ({
    watchId: z
        .number()
        .describe(t('TOOL_MARK_WATCHING_AS_READ_WATCH_ID', 'Watch ID to mark as read')),
}));
export const MarkWatchingAsReadResultSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});
export const markWatchingAsReadTool = (backlog, { t }) => {
    return {
        name: 'mark_watching_as_read',
        description: t('TOOL_MARK_WATCHING_AS_READ_DESCRIPTION', 'Mark a watch as read'),
        schema: z.object(markWatchingAsReadSchema(t)),
        outputSchema: MarkWatchingAsReadResultSchema,
        handler: async ({ watchId }) => {
            await backlog.resetWatchingListItemAsRead(watchId);
            return {
                success: true,
                message: `Watch ${watchId} marked as read`,
            };
        },
    };
};
