import { Statement } from "./statement";
import { getConfig } from "../config";
import { PromptIO } from "./components.interface";
import { compose, Tabs } from "../utils";

const Instruction = (instructionTitle: PromptIO, instructionText: PromptIO)=> {
    return compose(
            Statement(instructionTitle),
            Statement(`:${getConfig().instructionSpacing}`),
            Tabs(Statement(instructionText))
    );
};

export {
    Instruction
};