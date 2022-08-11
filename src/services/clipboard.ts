export async function copyTextToClipBoard(text: string) {
    if('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text)
    } else {
        return document.execCommand('copy', true, text)
    }
}

export async function pasteTextFromClipBoard(): Promise<String> {
    return await navigator.clipboard.readText()
}

export async function readContentFromClipBoard(): Promise<String> {
    let c =  await navigator.clipboard.read()
    console.log("clip board content:", c)
    return "hello"
}

interface ClipboardCallback {
    (value: string): void
}

export async function susbscribeToClipChange(cb: ClipboardCallback) {
    navigator.clipboard.addEventListener("copy", () => {
        console.log("TEXT copied")
    })
}