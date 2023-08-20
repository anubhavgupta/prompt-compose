const CONSTANT = {
    CONFIG: {
        dividerType: " ",
        dividerRepeat: 5,
        dividerBefore: "\n",
        dividerAfter: "\n",
        tabType:" ",
        tabRepeat: 4,
        instructionSpacing:"\n"
    }
    
};

type CONFIG_TYPE = typeof CONSTANT.CONFIG;

function getConfig() {
    return CONSTANT.CONFIG;
}

function setConfig(newConfig: Partial<CONFIG_TYPE>) {
    CONSTANT.CONFIG ={
        ...CONSTANT.CONFIG,
        ...newConfig
    };
}

export {
    getConfig,
    setConfig
};