/**
 * Generic resolver for entity identification by ID or named field (e.g., key, name, slug).
 * @param entity - The entity name, e.g., "project"
 * @param fieldName - The name of the alternative to `id`, e.g., "key", "name", "slug"
 * @param values - An object with `id?: number` and `[fieldName]?: string`
 * @param t - Translator
 */
function resolveIdOrField(entity, fieldName, values, t) {
    const value = tryResolveIdOrField(fieldName, values);
    if (value === undefined) {
        return {
            ok: false,
            error: new Error(t(`${entity.toUpperCase()}_ID_OR_${fieldName.toUpperCase()}_REQUIRED`, `${capitalize(entity)} ID or ${fieldName} is required`)),
        };
    }
    return { ok: true, value };
}
function tryResolveIdOrField(fieldName, values) {
    return values.id !== undefined ? values.id : values[fieldName];
}
export const resolveIdOrKey = (entity, values, t) => resolveIdOrField(entity, 'key', values, t);
export const resolveIdOrName = (entity, values, t) => resolveIdOrField(entity, 'name', values, t);
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
