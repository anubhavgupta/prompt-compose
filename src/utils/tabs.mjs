const tabText = "    ";
const Tabs = (textfn)=>(input)=>{
    let text = textfn(input);
    text = tabText + text;
    text = text.replaceAll("\n", `\n${tabText}`);

    return text;
}

export {
    Tabs
};
