type PromptIO = StatementPrompt | string;
type StatementPrompt = (input?: PromptIO) => PromptIO;
type ComposePrompt = (...compFns: PromptIO[]) => StatementPrompt;

export {
    PromptIO,
    StatementPrompt,
    ComposePrompt
};