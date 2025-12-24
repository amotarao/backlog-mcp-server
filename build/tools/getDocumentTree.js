import { z } from 'zod';
import { DocumentTreeFullSchemaZ, } from '../types/zod/backlogOutputDefinition.js';
import { buildToolSchema } from '../types/tool.js';
const getDocumentTreeSchema = buildToolSchema((t) => ({
    projectIdOrKey: z
        .union([z.string(), z.number()])
        .describe(t('TOOL_GET_DOCUMENT_TREE_PROJECT_ID_OR_KEY', 'Project ID or Key')),
}));
export const getDocumentTreeTool = (backlog, { t }) => {
    return {
        name: 'get_document_tree',
        description: t('TOOL_GET_DOCUMENT_TREE_DESCRIPTION', 'Gets the document tree of a project.'),
        schema: z.object(getDocumentTreeSchema(t)),
        outputSchema: DocumentTreeFullSchemaZ,
        importantFields: ['projectId', 'activeTree', 'trashTree'],
        handler: async ({ projectIdOrKey }) => {
            return backlog.getDocumentTree(projectIdOrKey);
        },
    };
};
