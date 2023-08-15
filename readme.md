# prompt-builder

Example code:
====

```JS
import { System, Section, Format, compose, Statement, None } from "prompt-builder";

const SystemStatement = System(Statement(`
You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.
`));

const ResponseFormater =  Section(
    Statement("Format"),
    Format([
        {
          stepIndex: "<number>",
          stepDetails: "<string>"
        }
      ]),
);

const getProblemSolverPromptMaker = ()=>{
    const solverPrompt =  compose(
        SystemStatement,
        Section(
            Statement("User"),
                ResponseFormater,
                Section(Statement("Problem")),
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
// O/P:
// System:
    
//     You are an AI assistant, you help users solve the given problem. 
//     - Your answeres are brief and to the point.
//     - You only answer in the format given by the user.
//     - If you don't know the answer to a question, you truthfully say that I don't know it. 
//     - You can end your answer with "END_END_END" text.
    
 
// User:
     
//     Format:
//         Answer should be in a valid JSON, use the following structure: 
//             ResponseJSON: [{"stepIndex":"<number>","stepDetails":"<string>"}]
     
//     Problem:
//         How to build a website?
 
// AI:
//     ;

```