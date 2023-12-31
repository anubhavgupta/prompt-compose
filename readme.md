# prompt-compose

This library provides basic axioms for building and managing GPT prompts. It helps in building small and reusable prompt components which can be composed together to build larger ones.  

# Installation:

NodeJS: 
```bash
npm install prompt-compose
```

Browser:
```JS
// via CDL link
import { Statement } from "https://unpkg.com/prompt-compose@0.1.0/dist/module.js";
const prompt = Statement("Hello World");
```

# Basic axioms for building prompts:

### Statement
Creates a simple line of text. It is a basic building block for building larger prompts. 

```JS
import { Statement } from "prompt-compose";

const question = Statement("How to make a website?");
question();
// "How to make a website?"
```

### Instruction
Creates a new Instruction of text with `title` and `content`.


```js
import { Instruction } from "prompt-compose";

const problemInstruction = Instruction(
    "Problem Statement",
    "How to make a website?"
);

problemInstruction();

// Problem Statement:
//     How to make a website?
```

Instead of using `string` directly, `Statement` can also be used whithout any change in result. This is true for rest of the examples as well.

```JS
const problemInstruction = Instruction(
    Statement("Problem Statement"),
    Statement("How to make a website?")
);

problemInstruction();

// Problem Statement:
//     How to make a website?

```





### Section
Creates a new `Section` of text with `title` and `content`. It is built using `Instruction` and adds few capabilities over and above it. 
#### Extra capabilities:
1. Multiple individual contents can be passed `content` without using compose.
     ```js
     Section("Main", "Instruction 1", "Instruction 2",..)`;
     ```
     Note: It uses compose internally.
2. Adds a divider at the end of the section.


```js
import { Section, Instruction } from "prompt-compose";

const problemSection = Section(
    "Problem Statement",
    "How to make a website?"
);

// Problem Statement:
//     How to make a website?

// Section can be used to compose multiple Instructions as well.
const userSection = Section(
    "User",
    Instruction(
        "Problem",
        "How to build a website?"
    ),
    Instruction(
        "Format",
        "Answer should be in step wise format."
    ),
    
);

// User:
//     Problem:
//         How to build a website?

//     Format:
//         Answer should be in step wise format.

```



### Format
Asks for a data structure and creates a prompt where it asks GPT to return the response in the given format. 
```JS
import { Format } from "prompt-compose";

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
Creates a system `Instruction`. 

```JS
import { System } from "prompt-compose";

const systemStatement = System(
`You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`
);

systemStatement();

// `System:
//     You are an AI assistant, you help users solve the given problem. 
//     - Your answeres are brief and to the point.
//     - You only answer in the format given by the user.
//     - If you don't know the answer to a question, you truthfully say that I don't know it. 
//     - You can end your answer with "END_END_END" text.`

```

### compose

Let you compose multiple prompts together.  

```JS
import { compose } from "prompt-compose";

// Example 1: 
const makePrompt = compose(
    systemStatement,
    problemSection,
);

makePrompt();

// System:
//     You are an AI assistant, you help users solve the given problem. 
//     - Your answeres are brief and to the point.
//     - You only answer in the format given by the user.
//     - If you don't know the answer to a question, you truthfully say that I don't know it. 
//     - You can end your answer with "END_END_END" text.
 
// Problem Statement:
//     How to make a website?
//
//

// Example 2: 
const makePrompt2 = compose(
    systemStatement,
    problemSection,
);

makePrompt2(
    "Solution:" // can also pass Statement("Solution:")
);

// Problem Statement:
//     How to make a website?
//
// Solution:

```

### Divider
Configurable, adds a division between 2 given prompts. use `setConfig()` to configure the look and feel of `Divider`.

```JS
import { Divider, Statement } from "prompt-compose";

// Example 1: 
const promptWithDivider = compose(
    Statement("Do task 1."),
    Divider(),
    Statement("Do task 2.")
);
promptWithDivider()

// Do task 1.
// 
// Do task 2.


// Example 2: 
setConfig({
    dividerType: "-",
})

const promptWithDivider2 = compose(
    Statement("Do task 1."),
    Divider(),
    Statement("Do task 2.")
);
promptWithDivider2()

// Do task 1.
// -----
// Do task 2.
 
```

### None
An empty input.
```JS
import { None, Section, Statement } from "prompt-compose";

const expectedResponse = Section(
        Statement("AI"),
        None()
);
expectedResponse();

// AI:
//   
```

### Configuration
This lib provides `getConfig()` and `setConfig()` functions to configure various aspects of the Axioms.
```JS
import { setConfig, getConfig } from "prompt-compose";

setConfig({
    tabType: " ", // \t or space; String should be used for tab ?
    tabRepeat: 4, // number of times the above needs to be repeated ?
    dividerType: "-", // which string should be used as a divider
    dividerRepeat: 5, // number of times the above needs to be repeated ?
    dividerBefore: "\n", // string before the divider
    dividerAfter: "\n", // string after the divider
    instructionSpacing:"\n" // string to create space between the title and the content in an Instruction.
});

const config = getConfig(); // returns the config object.
```

```JS
// below is the default configuration:
{
    dividerType: " ",
    dividerRepeat: 5,
    dividerBefore: "\n",
    dividerAfter: "\n",
    tabType:" ",
    tabRepeat: 4,
    instructionSpacing:"\n"
}
```



Example code:
====

```JS
import { 
    System,
    instruction,
    Section,
    Format,
    compose,
    Statement,
    None,
    setConfig,
} from "prompt-compose";
import type { PromptIO } from "prompt-compose";

// set the desired configuration if required.
setConfig({
    tabType: " ",
    tabRepeat: 4,
    dividerType: "",
    dividerRepeat: 0,
    dividerBefore: "\n",
    dividerAfter: "\n",
    instructionSpacing: "\n"
});

// create a System prompt telling GPT how to act.
const systemPrompt = () => System(
`You are an AI assistant, you help users solve the given problem. 
- Your answeres are brief and to the point.
- You only answer in the format given by the user.
- If you don't know the answer to a question, you truthfully say that I don't know it. 
- You can end your answer with "END_END_END" text.`
);

// create a user prompt telling GPT what user is asking for and how they want the response to be like.
const userPrompt = (problemToSolve: PromptIO, responseFormat: Array<any> | Object)=>{
    return Section(
        "User",
        Instruction(
            "Format",
            Format(responseFormat)
        ),
        problemInstruction(problemToSolve)
    );
};

// create a AI response completion prompt.
// accepts a response Statement, fallsback to None(empty string)
const aiPrompt = (response: PromptIO = None())=>{
    return Instruction(
        "AI",
        response
    );
}

// Defines a new Instruction where user can pass their ask
// Used by userPrompt.
const problemInstruction = (problemToSolve: PromptIO) => Instruction(
    "Problem",
    problemToSolve
);

// format in which we need the GPT too respond.
const responseFormat = [
    {
        stepIndex: "<number>",
        stepDetails: "<string>"
    }
];

// Now we compose the above prompts to generate the desired prompt.
const getProblemSolver = (problemToSolve: PromptIO, responseFormat: Array<any> | Object)=>{
    return compose(
        systemPrompt(), 
        userPrompt(problemToSolve, responseFormat), // problemInstruction and responseFormat are passed here
        aiPrompt()
    );
}

const generateSolverPrompt = getProblemSolver("How to build a website?", responseFormat);
const promptGenerated = generateSolverPrompt();


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

const generateSolverPrompt = getProblemSolver("How to make a pizza?", [
    {
        stepIndex: "<number>",
        stepDetails: "<string>",
        requiresOven: "<boolean>"
    }
]);
const promptGenerated = generateSolverPrompt();


// System:
//     You are an AI assistant, you help users solve the given problem. 
//     - Your answeres are brief and to the point.
//     - You only answer in the format given by the user.
//     - If you don't know the answer to a question, you truthfully say that I don't know it. 
//     - You can end your answer with "END_END_END" text.
//
// User:
//     Format:
//         Answer should be in a valid JSON, use the following structure:
//             ResponseJSON: [{"stepIndex":"<number>","stepDetails":"<string>","requiresOven":"<boolean>"}]
//    
//     Problem:
//         How to make a pizza?
//
// AI:
//
```
# Development

- All axioms like `Statement`, `Instruction`, etc. are in `./src/base-components` directory.
- Configuration utilities are in `./src/config/`
- Utilities like `compose` and `Tabs` are in `./src/utils/`
- Tests are in `./tests/index.ts`

```bash

# make required code changes then run following command to run tests
npm run test

# to build the project
npm run build

```