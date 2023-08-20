import { Statement } from "./statement";
import { getConfig } from "../config";

const Divider = () => {
    const config = getConfig();
    const separator = config.dividerType;
    const repeatCount = config.dividerRepeat;
    return Statement(`${config.dividerBefore}${separator.repeat(repeatCount)}${config.dividerAfter}`);
};

export {  
    Divider
};