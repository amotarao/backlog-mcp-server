import { registerTools } from '../registerTools.js';
import { enableToolset } from '../utils/toolsetUtils.js';
export function createToolRegistrar(server, toolsetGroup, options) {
    return {
        async enableToolsetAndRefresh(toolset) {
            const msg = enableToolset(toolsetGroup, toolset);
            registerTools(server, toolsetGroup, options);
            await server.server.sendToolListChanged();
            return msg;
        },
    };
}
