// type AxiomNone = () => "";
// type AxiomBase = () => string;
// type Axiom = ()=> string;

// // (configuration)=>(Node) => result
type PromptIO = StatementPrompt | string;
type StatementPrompt = (input?: PromptIO) => PromptIO;
type ComposePrompt = (...compFns: PromptIO[]) => StatementPrompt;

export {
    PromptIO,
    StatementPrompt,
    ComposePrompt
}


// 5 === M(5) M(M(5))
// M(number | M)

// left and right identity
// a* 1 || 1*a = a
//f(g(h())) === f(g)(h())  

// S("hi", S("by"))(S('Chi'))
// S("hi")(S("by", S(Chi)))
/**
 compose(
    System("asdasdassd"),
    
    Section(
        Statement("User"),
        compose(
            Section(
                Statement("Format"),
                Format({...})
            ),
            Section(
                Statement("Problem"),

            )
        )
        
    )
 )

 <>
    <system>
      <statement>asdasdasdada</statement>
    <system>
    <section name={"User"}>
        <section name={"Format"}>
            <format type={{....}} />
        </section>            
        <section name={"Problem"}>
            <statement>asdasdasdada</statement>
        </section>            
    </section>
 </>



 */
