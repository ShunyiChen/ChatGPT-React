
export function getTextWidth(text: string, font: string): number {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d") 
    if (!context) {
        throw new Error("Could not get 2D context from canvas element.")
    }
    context.font = font
    const metrics = context.measureText(text)
    return metrics.width
}