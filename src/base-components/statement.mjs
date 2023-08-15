const Statement = (statement, endsWith = "",startsWith = "")=>(statementAlt)=> {
    let text = statement;
    if(statement) {
        if(typeof statement === "function") {
            if(statementAlt) {
                if(typeof statementAlt === "function") {
                    text = statement(statementAlt());
                } else {
                    text = statement(statementAlt);
                }
            } else {
                text = statement();
            }
        }
    } else {
        text = statementAlt;
        if(typeof statementAlt === "function") {
            text = statementAlt();
        } 
    }
    return `${startsWith}${text}${endsWith}`;
}

const None = ()=>()=> "";

export {
    Statement,
    None
};
