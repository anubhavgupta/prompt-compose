import { StatementPrompt, PromptIO } from "./components.interface";
import { None } from "./none";

const Statement = ((inputStr: PromptIO = None())=>(nextInputStr: PromptIO = None()): string => {

    let str1 = inputStr;
    let str2 = nextInputStr;

    while(typeof str1 === "function") {
        str1 = str1();
    }

    while(typeof str2 === "function") {
        str2 = str2();
    }
    return `${str1}${str2}`;
}) satisfies StatementPrompt;

export {
    Statement
};