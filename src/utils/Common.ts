export function getIcon(name: string) {
    return new URL(`../assets/logo/${name}`, import.meta.url).href;
}