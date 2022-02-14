export function mountStyle(cssContent: string) {
    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
    styleTag.appendChild(document.createTextNode(cssContent));
}