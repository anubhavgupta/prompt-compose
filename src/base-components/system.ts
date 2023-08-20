import { compose } from "../utils"
import { Statement } from "./statement";
import { Instruction } from "./instruction";
import { Section } from "./section";
import { PromptIO } from "./components.interface";

function System(instruction: PromptIO) {
    return Section(Statement("System"), instruction);// Instruction(Statement("System"), );
}

export {
    System
};
