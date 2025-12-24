import { parse } from 'graphql';
import { isErrorLike } from '../../types/result.js';
export function wrapWithFieldPicking(fn) {
    return async (input) => {
        const { fields, ...rest } = input;
        const result = await fn(rest);
        if (!fields || isErrorLike(result)) {
            return result;
        }
        const selectionSet = parseFieldsSelection(fields);
        const resultData = result.data;
        if (Array.isArray(resultData)) {
            return {
                kind: 'ok',
                data: resultData.map((item) => pickFieldsFromData(item, selectionSet)),
            };
        }
        else if (typeof result === 'object' && result !== null) {
            return {
                kind: 'ok',
                data: pickFieldsFromData(resultData, selectionSet),
            };
        }
        else {
            return result;
        }
    };
}
function parseFieldsSelection(fieldsString) {
    const query = `query Dummy ${fieldsString}`;
    const ast = parse(query);
    const opDef = ast.definitions[0];
    if (opDef.kind !== 'OperationDefinition' || !opDef.selectionSet) {
        throw new Error('Invalid GraphQL fields');
    }
    return opDef.selectionSet;
}
function pickFieldsFromData(data, selectionSet) {
    const result = {};
    for (const selection of selectionSet.selections) {
        if (selection.kind === 'Field') {
            const key = selection.name.value;
            if (data != null && key in data) {
                const value = data[key];
                if (selection.selectionSet && value != null) {
                    result[key] = pickFieldsFromData(data[key], selection.selectionSet);
                }
                else {
                    result[key] = data[key];
                }
            }
        }
    }
    return result;
}
