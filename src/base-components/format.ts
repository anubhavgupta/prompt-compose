import { Instruction } from "./instruction";
import { Section } from "./section";

function Format(dataStructureSample: Array<any> | Object) {
    return Instruction(
        `Answer should be in a valid JSON, use the following structure`,
        `ResponseJSON: ${JSON.stringify(dataStructureSample)}`
    );
}

export {
    Format
};