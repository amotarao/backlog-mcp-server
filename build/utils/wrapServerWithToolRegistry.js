// This function takes an McpServer instance and extends it with a tool registration mechanism that prevents duplicate tool registrations.
export function wrapServerWithToolRegistry(server) {
    const s = server;
    if (!s.__registeredToolNames) {
        s.__registeredToolNames = new Set();
    }
    s.registerOnce = (name, description, schema, handler) => {
        if (s.__registeredToolNames.has(name)) {
            console.warn(`Skipping duplicate tool registration: ${name}`);
            return;
        }
        s.__registeredToolNames.add(name);
        s.tool(name, description, schema, handler);
    };
    return s;
}
