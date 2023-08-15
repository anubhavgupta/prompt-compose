import { Statement } from "./statement.mjs";

function Format(dataStructureSample) {
    return Statement(`Answer should be in a valid JSON, use the following structure:`, ` \n    ResponseJSON: ${JSON.stringify(dataStructureSample)}`);
}

export {
    Format
};