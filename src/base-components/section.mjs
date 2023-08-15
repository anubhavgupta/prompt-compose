import { Divider } from "./divider.mjs";
import { compose } from "../utils/index.mjs";
import { Instruction } from "./instruction.mjs";

const Section = (instructionTitle, ...content) => {
    let instructionText = undefined;
    if(content.length) {
        instructionText = compose(...content);
    }
    return compose(
        Divider(false, false),
        Instruction(instructionTitle, instructionText)
    )
} ;

export {
    Section
};


