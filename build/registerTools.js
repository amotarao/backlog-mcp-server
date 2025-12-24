import { backlogErrorHandler } from './backlog/backlogErrorHandler.js';
import { composeToolHandler } from './handlers/builders/composeToolHandler.js';
export function registerTools(server, toolsetGroup, options) {
    const { useFields, maxTokens, prefix, enabledTools } = options;
    registerToolsets({
        server,
        toolsetGroup,
        prefix,
        enabledTools,
        handlerStrategy: (tool) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        composeToolHandler(tool, {
            useFields,
            errorHandler: backlogErrorHandler,
            maxTokens,
        }),
    });
}
export function registerDyamicTools(server, dynamicToolsetGroup, prefix) {
    registerToolsets({
        server,
        toolsetGroup: dynamicToolsetGroup,
        prefix,
        handlerStrategy: (tool) => tool.handler,
    });
}
function registerToolsets({ server, toolsetGroup, prefix, handlerStrategy, enabledTools, }) {
    for (const toolset of toolsetGroup.toolsets) {
        for (const tool of toolset.tools) {
            // Enable tool if:
            // 1. Its toolset is enabled, OR
            // 2. The tool is explicitly listed in enabledTools
            const shouldEnableTool = toolset.enabled ||
                (enabledTools && enabledTools.includes(tool.name));
            if (!shouldEnableTool) {
                continue;
            }
            const toolNameWithPrefix = `${prefix}${tool.name}`;
            const handler = handlerStrategy(tool);
            server.registerOnce(toolNameWithPrefix, tool.description, tool.schema.shape, handler);
        }
    }
}
