import { 
    System,
    Section,
    Format,
    compose,
    Statement,
    None,
    Divider,
    Instruction,
    setConfig
} from "../src";
import { equal } from "assert";
import { runner } from "./runner";


setConfig({
    tabType: " ",
    tabRepeat: 4,
    dividerType: "-",
    dividerRepeat: 5,
    dividerBefore: "\n",
    dividerAfter: "\n",
});


runner((test) => {

    test("Statement",()=>{
        const question = Statement("How to make a website?");
        equal(question(), "How to make a website?")
    });
    
    test("Instruction", ()=>{
        const problemInstruction = Instruction(
            Statement("Problem Statement"),
            Statement("How to make a website?")
        );
    
        equal(
            problemInstruction(), 
`Problem Statement:
    How to make a website?`
        );
    });
    
    test("Section", ()=>{
        const problemSection = Section(
            Statement("Problem Statement"),
            Statement("How to make a website?")
        );
    
        equal(
            problemSection(), 
`Problem Statement:
    How to make a website?
-----
`
        );
    });
    
    test("Format", ()=>{
        const formatTheReponse = Format([
            {
                stepIndex: "<number>",
                stepDetails: "<string>"
            }
        ]);
        
        equal(formatTheReponse(), 
`Answer should be in a valid JSON, use the following structure:
    ResponseJSON: [{"stepIndex":"<number>","stepDetails":"<string>"}]`
        );
    });
    
    test("System", ()=>{
        const systemStatement = System(
            Statement(
`You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`
            )
        );
            
        equal(systemStatement(), 
`System:
    You are an AI assistant, you help users solve the given problem. 
    - Your answeres are brief and to the point.
    - You only answer in the format given by the user.
    - If you don't know the answer to a question, you truthfully say that I don't know it. 
    - You can end your answer with "END_END_END" text.
-----
`
        );
    });
    
    
    test("compose", ()=>{
        const systemStatement = System(
            Statement(
`You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`
            )
        );
    
        const problemSection = Instruction(
            Statement("Problem Statement"),
            Statement("How to make a website?")
        );    
    
        const makePrompt = compose(
            systemStatement,
            problemSection,
        );
    
        equal(makePrompt(), 
`System:
    You are an AI assistant, you help users solve the given problem. 
    - Your answeres are brief and to the point.
    - You only answer in the format given by the user.
    - If you don't know the answer to a question, you truthfully say that I don't know it. 
    - You can end your answer with "END_END_END" text.
-----
Problem Statement:
    How to make a website?`
        );
    });
    
    test("Divider", ()=>{
        const promptWithDivider = compose(
            Statement("Do task 1."),
            Divider(),
            Statement("Do task 2.")
        );
        
        equal(promptWithDivider(),
`Do task 1.
-----
Do task 2.`
        )
    })
    
    test("Prompt", ()=>{
    
        setConfig({
            tabType: " ",
            tabRepeat: 4,
            dividerType: "",
            dividerRepeat: 0,
            dividerBefore: "\n",
            dividerAfter: "\n",
            instructionSpacing: "\n"
        });
    
        const systemStatement = System(
            Statement(
`You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`
            )
        );
    
        const problemSection = Instruction(
            Statement("Problem"),
            Statement("How to make a website?")
        );
    
        const formatTheReponse = Format([
            {
                stepIndex: "<number>",
                stepDetails: "<string>"
            }
        ]);
    
        const getProblemSolverPromptMaker = ()=>{
            const solverPrompt =  compose(
                systemStatement,
                Section(
                    Statement("User"),
                    Instruction(
                        Statement("Format"),
                        formatTheReponse
                    ),
                    problemSection
                ),
                Section(
                    Statement("AI"),
                    None()
                )
            );
        
            return solverPrompt;
        }
        
        const problemSolverPromptMaker = getProblemSolverPromptMaker();
        const promptGenerated = problemSolverPromptMaker();
        const expectedPrompt = 
`System:
    You are an AI assistant, you help users solve the given problem. 
    - Your answeres are brief and to the point.
    - You only answer in the format given by the user.
    - If you don't know the answer to a question, you truthfully say that I don't know it. 
    - You can end your answer with "END_END_END" text.

User:
    Format:
        Answer should be in a valid JSON, use the following structure:
            ResponseJSON: [{"stepIndex":"<number>","stepDetails":"<string>"}]
    
    Problem:
        How to make a website?

AI:
    

`;
        equal(promptGenerated, expectedPrompt, "Post construction response doesn't match");
        
    });
});