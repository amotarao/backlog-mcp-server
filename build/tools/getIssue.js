import { z } from 'zod';
import { buildToolSchema } from '../types/tool.js';
import { IssueSchema } from '../types/zod/backlogOutputDefinition.js';
import { resolveIdOrKey } from '../utils/resolveIdOrKey.js';
const getIssueSchema = buildToolSchema((t) => ({
    issueId: z
        .number()
        .optional()
        .describe(t('TOOL_GET_ISSUE_ISSUE_ID', 'The numeric ID of the issue (e.g., 12345)')),
    issueKey: z
        .string()
        .optional()
        .describe(t('TOOL_GET_ISSUE_ISSUE_KEY', "The key of the issue (e.g., 'PROJ-123')")),
}));
export const getIssueTool = (backlog, { t }) => {
    return {
        name: 'get_issue',
        description: t('TOOL_GET_ISSUE_DESCRIPTION', 'Returns information about a specific issue'),
        outputSchema: IssueSchema,
        schema: z.object(getIssueSchema(t)),
        handler: async ({ issueId, issueKey }) => {
            const result = resolveIdOrKey('issue', { id: issueId, key: issueKey }, t);
            if (!result.ok) {
                throw result.error;
            }
            return backlog.getIssue(result.value);
        },
    };
};
