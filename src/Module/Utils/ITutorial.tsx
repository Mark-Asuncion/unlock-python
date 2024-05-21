export interface TutorialContent {
    tag: "h1" | "p" | "code",
    content: string
}

export interface ITutorial {
    title: string,
    img: string,
    contents: TutorialContent[]
}
