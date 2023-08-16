# prompt-compose

This library provides basic axioms for building and managing GPT prompts. It helps you build small and resuable prompt components and then let you compose them together to build larger ones.  

# Installation:

NodeJS: 
```bash
npm install prompt-compose
```

Basic axioms for building prompts:
====

### Statement
Creates a simple line of text. It is a basic building block for building larger prompts. 

```JS
const question = Statement("How to make a website?");
question();
// "How to make a website?"
```

### Section
Creates a new section of text with `title` and `content`.

```JS
const problemSection = Section(
    Statement("Problem Statement"),
    Statement("How to make a website?")
);

problemSection();
//  
// Problem Statement:
//     How to make a website?

```

### Format
Asks for a data structure and creates a prompt where it asks GPT to return the response in the given format. 
```JS
const formatTheReponse = Format([
    {
        stepIndex: "<number>",
        stepDetails: "<string>"
    }
]);

formatTheReponse();
// `Answer should be in a valid JSON, use the following structure: 
//     ResponseJSON: [{"stepIndex":"<number>","stepDetails":"<string>"}]`

```

### System

```JS
const systemStatement = System(
Statement(`
You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`)
);

systemStatement();

// `System:
//    
//     You are an AI assistant, you help users solve the given problem. 
//     - Your answeres are brief and to the point.
//     - You only answer in the format given by the user.
//     - If you don't know the answer to a question, you truthfully say that I don't know it. 
//     - You can end your answer with "END_END_END" text.`

```

### Compose

Let you compose multiple prompts together.  

```JS
const makePrompt = compose(
    systemStatement,
    problemSection,
);

makePrompt();

// System:
//    
//     You are an AI assistant, you help users solve the given problem. 
//     - Your answeres are brief and to the point.
//     - You only answer in the format given by the user.
//     - If you don't know the answer to a question, you truthfully say that I don't know it. 
//     - You can end your answer with "END_END_END" text.
 
// Problem Statement:
//     How to make a website?
```

### Divider
Configurable, adds a division between 2 given prompts.

```JS
const promptWithDivider = compose(
    Statement("Do task 1."),
    Divider(),
    Statement("Do task 2.")
);
promptWithDivider()

// Do task 1.
// 
// Do task 2.
 
```

### None
An empty input.
```JS
const expectedResponse = Section(
        Statement("AI"),
        None()
);
expectedResponse();

// AI:
//   
```

Example code:
====

```JS
import { System, Section, Format, compose, Statement, None } from "prompt-compose";

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
//     

```
