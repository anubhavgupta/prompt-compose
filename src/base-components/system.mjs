import { Instruction } from "./instruction.mjs";
import { Statement } from "./statement.mjs";

function System(instruction) {
    return Instruction(Statement("System"), instruction);
}

export {
    System
};
