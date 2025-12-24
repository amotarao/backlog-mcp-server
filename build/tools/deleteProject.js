import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { ProjectSchema } from '../types/zod/backlogOutputDefinition.js';
import { resolveIdOrKey } from '../utils/resolveIdOrKey.js';
const deleteProjectSchema = buildToolSchema((t) => ({
    projectId: z
        .number()
        .optional()
        .describe(t('TOOL_DELETE_PROJECT_PROJECT_ID', 'The numeric ID of the project (e.g., 12345)')),
    projectKey: z
        .string()
        .optional()
        .describe(t('TOOL_DELETE_PROJECT_PROJECT_KEY', "The key of the project (e.g., 'PROJECT')")),
}));
export const deleteProjectTool = (backlog, { t }) => {
    return {
        name: 'delete_project',
        description: t('TOOL_DELETE_PROJECT_DESCRIPTION', 'Deletes a project'),
        schema: z.object(deleteProjectSchema(t)),
        outputSchema: ProjectSchema,
        handler: async ({ projectId, projectKey }) => {
            const result = resolveIdOrKey('project', { id: projectId, key: projectKey }, t);
            if (!result.ok) {
                throw result.error;
            }
            return backlog.deleteProject(result.value);
        },
    };
};
