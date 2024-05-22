export interface QuestionContent {
    type: "p" | "code",
    content: string
}

export interface Question {
    type: "mult" | "fill",
    q: QuestionContent[],
    choices?: string[]
    answer: string | string[],
}

export interface IQuestionnare {
    title: string,
    questions: Question[]
}
