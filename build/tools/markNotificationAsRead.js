import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
const markNotificationAsReadSchema = buildToolSchema((t) => ({
    id: z
        .number()
        .describe(t('TOOL_MARK_NOTIFICATION_AS_READ_ID', 'Notification ID to mark as read')),
}));
export const MarkNotificationAsReadResultSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});
export const markNotificationAsReadTool = (backlog, { t }) => {
    return {
        name: 'mark_notification_as_read',
        description: t('TOOL_MARK_NOTIFICATION_AS_READ_DESCRIPTION', 'Mark a notification as read'),
        schema: z.object(markNotificationAsReadSchema(t)),
        outputSchema: MarkNotificationAsReadResultSchema,
        handler: async ({ id }) => {
            await backlog.markAsReadNotification(id);
            return {
                success: true,
                message: `Notification ${id} marked as read`,
            };
        },
    };
};
