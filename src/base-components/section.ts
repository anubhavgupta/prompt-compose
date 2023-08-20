import { Divider } from "./divider";
import { compose } from "../utils";
import { Instruction } from "./instruction";
import { Statement } from "./statement";
import type { PromptIO } from "./components.interface";

const Section = (instructionTitle: PromptIO, ...content: PromptIO[]) => {
    let instructionText: PromptIO;
    switch(content.length) {
        case 0: {
            instructionText = Statement("");
            break;
        }
        case 1: {
            instructionText = content[0];
            break;
        }
        default: {
            // (content.length > 1)
            const dividedContent = [];
            content.forEach((cont)=>{
                dividedContent.push(cont);
                dividedContent.push(Divider());
            });
            dividedContent.pop();
            instructionText = compose(...dividedContent);
            break;
        }
    }  
    return compose(
        Instruction(instructionTitle, instructionText),
        Divider(),
    )
} ;

export {
    Section
};


