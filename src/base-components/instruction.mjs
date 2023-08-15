import { Statement } from "./statement.mjs";
import { compose, Tabs } from "../utils/index.mjs";

const Instruction = (instructionTitle, instructionText)=> compose(
    Statement(instructionTitle, ":",),
    Tabs(Statement(instructionText))
);

export {
    Instruction
};