import type { PromptIO } from "../base-components/components.interface";
import { Statement } from "../base-components";  

const compose = (...strFns: PromptIO[]) => {
    return (input?: PromptIO) => {
        const safeInput = Statement()(input);
        return strFns.reduceRight<string>((result: PromptIO, next: PromptIO)=> {
            return Statement(next)(result);
        }, safeInput); 
    };
};

export {
    compose
};
