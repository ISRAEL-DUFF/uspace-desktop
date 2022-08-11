export function uTimeNow(): string {
    let date = new Date()
   return `${date.toDateString()}, ${date.toLocaleTimeString()}`
}