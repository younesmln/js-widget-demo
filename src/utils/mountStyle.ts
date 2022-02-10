export function mountStyle() {
    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
    /*
    * Important: $injected_styleContent variable contains the raw css text and  
    * is injected dynamically from the rollup plugin RawCssInjector
    */
    // @ts-ignore
    styleTag.appendChild(document.createTextNode($injected_styleContent));
}