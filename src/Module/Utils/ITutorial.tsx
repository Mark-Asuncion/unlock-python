export interface TutorialContent {
    tag: "h1" | "p" | "code",
    content: string
}

export interface ITutorial {
    title: string,
    contents: TutorialContent[]
}
