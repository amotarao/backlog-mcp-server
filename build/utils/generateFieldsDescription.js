import { z } from 'zod';
/**
 * Generate GraphQL like fields and type specs from Zod types
 */
export function generateFieldsDescription(outputSchema, importantFields = [], typeName = 'Output') {
    const allFields = Object.keys(outputSchema.shape);
    // Generate Example Query
    const exampleQueryFields = importantFields.length > 0 ? importantFields : allFields;
    // Generate Output Schema
    const gqlTypeDef = generateGraphQLType(typeName, outputSchema);
    return `
Specify the fields to retrieve using GraphQL query syntax.
Example (query):
{
  ${exampleQueryFields.join('\n  ')}
}
Output schema (type definition):
${gqlTypeDef}
  `.trim();
}
function generateGraphQLType(typeName, schema) {
    const lines = [`type ${typeName} {`];
    for (const [key, value] of Object.entries(schema.shape)) {
        lines.push(`  ${key}: ${mapZodTypeToGraphQLType(value)}`);
    }
    lines.push('}');
    return lines.join('\n');
}
/**
 * Zod to graphql
 */
function mapZodTypeToGraphQLType(zodType) {
    if (zodType instanceof z.ZodString)
        return 'String!';
    if (zodType instanceof z.ZodNumber)
        return 'Int!';
    if (zodType instanceof z.ZodBoolean)
        return 'Boolean!';
    if (zodType instanceof z.ZodNullable)
        return mapZodTypeToGraphQLType(zodType.unwrap()).replace(/!$/, '');
    if (zodType instanceof z.ZodOptional)
        return mapZodTypeToGraphQLType(zodType.unwrap()).replace(/!$/, '');
    // Spec: a nested part is JSON
    if (zodType instanceof z.ZodObject)
        return 'JSON';
    return 'String';
}
