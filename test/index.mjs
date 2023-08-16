import { System, Section, Format, compose, Statement, None, Divider } from "../src/index.mjs";
import { equal } from "assert";

const question = Statement("How to make a website?");
equal(question(), "How to make a website?")

const problemSection = Section(
    Statement("Problem Statement"),
    Statement("How to make a website?")
);

equal(
    problemSection(), 
` 
Problem Statement:
    How to make a website?`
);

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

const systemStatement = System(
Statement(`
You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`)
);

equal(systemStatement(), 
`System:
    
    You are an AI assistant, you help users solve the given problem. 
    - Your answeres are brief and to the point.
    - You only answer in the format given by the user.
    - If you don't know the answer to a question, you truthfully say that I don't know it. 
    - You can end your answer with "END_END_END" text.`
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
 
Problem Statement:
    How to make a website?`
);

const promptWithDivider = compose(
    Statement("Do task 1."),
    Divider(),
    Statement("Do task 2.")
);

equal(promptWithDivider(),
`Do task 1.
 
Do task 2.`)


const getProblemSolverPromptMaker = ()=>{
    const solverPrompt =  compose(
        systemStatement,
        Section(
            Statement("User"),
            Section(
                Statement("Format"),
                formatTheReponse
            ),
            Section(Statement("Problem")), // input would be attached within this section
        ),
        Section(
            Statement("AI"),
            None()
        )
    );

    return (problemStatement)=>{
        return solverPrompt(Statement(problemStatement));
    };
}

const problemSolverPromptMaker = getProblemSolverPromptMaker();

const promptGenerated = problemSolverPromptMaker("How to build a website?");

console.log(promptGenerated);

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
        How to build a website?
 
AI:
    `;


equal(promptGenerated, expectedPrompt, "Post construction response doesn't match");

console.log("Test pass: Success");