import { allTools } from '../tools/tools.js';
export function getToolset(group, name) {
    return group.toolsets.find((t) => t.name === name);
}
export function enableToolset(group, name) {
    const ts = getToolset(group, name);
    if (!ts)
        return `Toolset ${name} not found`;
    if (ts.enabled)
        return `Toolset ${name} is already enabled`;
    ts.enabled = true;
    return `Toolset ${name} enabled`;
}
export function getEnabledTools(group) {
    return group.toolsets.filter((ts) => ts.enabled).flatMap((ts) => ts.tools);
}
export function listAvailableToolsets(group) {
    return group.toolsets.map((ts) => ({
        name: ts.name,
        description: ts.description,
        currentlyEnabled: ts.enabled,
        canEnable: true,
    }));
}
export function listToolsetTools(group, name) {
    const ts = getToolset(group, name);
    return (ts?.tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        toolset: name,
        canEnable: true,
    })) ?? []);
}
export function validateToolNames(group, toolNames) {
    const allToolNames = group.toolsets.flatMap((ts) => ts.tools.map((tool) => tool.name));
    const unknown = toolNames.filter((name) => !allToolNames.includes(name));
    if (unknown.length > 0) {
        console.warn(`⚠️ Unknown tools: ${unknown.join(', ')}`);
    }
}
export const buildToolsetGroup = (backlog, helper, enabledToolsets) => {
    const toolsetGroup = allTools(backlog, helper);
    const knownNames = toolsetGroup.toolsets.map((ts) => ts.name);
    const unknown = enabledToolsets.filter((name) => name !== 'all' && !knownNames.includes(name));
    if (unknown.length > 0) {
        console.warn(`⚠️ Unknown toolsets: ${unknown.join(', ')}`);
    }
    const allEnabled = enabledToolsets.includes('all');
    return {
        toolsets: toolsetGroup.toolsets.map((ts) => ({
            ...ts,
            enabled: allEnabled || enabledToolsets.includes(ts.name),
        })),
    };
};
