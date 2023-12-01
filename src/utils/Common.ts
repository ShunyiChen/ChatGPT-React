export function getLogoIcon(name: string) {
    return new URL(`../assets/logo/${name}`, import.meta.url).href;
}


export function getIcon(name: string) {
    return new URL(`../assets/${name}`, import.meta.url).href;
}