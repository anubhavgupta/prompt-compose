import { PromptIO } from "../base-components/components.interface";
import { Statement, None } from "../base-components";
import { getConfig } from "../config"

const Tabs = (prompt: PromptIO)=>(input: PromptIO = None())=>{
    const config = getConfig();
    const TAB_TEXT = config.tabType.repeat(config.tabRepeat);
    let text = Statement(prompt)(input);
    text = TAB_TEXT + text;
    text = text.replaceAll("\n", `\n${TAB_TEXT}`);

    return text;
}

export {
    Tabs
};
