declare var pages: page;
interface pageConfiguration {
    getData: string;
    postData: string;
    template: Array<any>;
}
interface page {
    pageName: string;
    configuration: pageConfiguration;
}
declare class coreElement {
    constructor(element: string, makeFunction: any);
    element: string;
    makeFunction: any;
}
declare class core {
    private _elementMap;
    private _pages;
    private static _excludedAttributes;
    constructor(pages: any);
    private initElementMap();
    getElementMaker(elementName: string): Function;
    createElement(element: any): HTMLElement;
    init(): void;
    processPageTemplate(template: page, fctn: Function): void;
    static makeSelect(attributes: any): HTMLSelectElement;
    static makeDiv(attributes: any): HTMLDivElement;
    static makeText(attributes: any): HTMLInputElement;
    private static excludeAttribute(element);
    private static attributeHelper(element, attributes);
}
declare var t: core;
