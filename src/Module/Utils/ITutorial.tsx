export interface TutorialContent {
    type: "h1" | "p" | "code" | "table",
    content: string
}

export interface ITutorial {
    title: string,
    img: string,
    contents: TutorialContent[]
}
