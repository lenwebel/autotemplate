class coreElement {
    constructor(element, makeFunction) {
        this.element = element;
        this.makeFunction = makeFunction;
    }
}
class core {
    constructor(pages) {
        this._pages = pages;
        this.init();
    }
    initElementMap() {
        this._elementMap = new Array();
        this._elementMap.push(new coreElement("select", core.makeSelect));
        this._elementMap.push(new coreElement("text", core.makeText));
        this._elementMap.push(new coreElement("div", core.makeDiv));
    }
    getElementMaker(elementName) {
        var makeElement = this._elementMap.filter((o) => {
            if (elementName) {
                console.log(elementName);
                return o.element.toLowerCase() === elementName.toLowerCase();
            }
            [0];
            return false;
        });
        if (!makeElement[0]) {
            return (a) => { return core.makeDiv(a); };
        }
        return makeElement[0].makeFunction;
    }
    createElement(element) {
        let result;
        result = this.evalHierarchicalElements(element, null);
        return result;
    }
    evalHierarchicalElements(element, currentHTMLElement) {
        var nElement = this.varToElement(element);
        if (currentHTMLElement) {
            if (!nElement || !this.isHTMLElement(nElement)) {
                return currentHTMLElement;
            }
            nElement.appendChild(currentHTMLElement);
        }
        if (element.parentElement) {
            currentHTMLElement = this.evalHierarchicalElements(element.parentElement, nElement);
        }
        else {
            currentHTMLElement = nElement;
        }
        if (!currentHTMLElement) {
            return nElement;
        }
        return currentHTMLElement;
    }
    varToElement(element) {
        if (this.isHTMLElement(element)) {
            return element;
        }
        if (element && typeof element === 'object') {
            var makeElement = this.getElementMaker(element.element);
            element = makeElement(element);
        }
        if (element && typeof element === 'string') {
            let e = document.getElementById(element);
            if (!e) {
                console.warn("element with ID:'", element, "'could not be found, i will create a div element and append it to the document body");
                var d = document.createElement('div');
                d.innerHTML = element;
                document.getElementsByTagName('body')[0].appendChild(d);
            }
        }
        return element;
    }
    init() {
        this._pages.forEach((page) => console.log("page:", page.pageName, page.configuration));
        var p = this._pages;
        this.initElementMap();
        this._pages.forEach((page) => {
            this.processPageTemplate(page, (field) => {
                field.HTMLElement = this.createElement(field);
            });
        });
        let div = document.createElement('div');
        this.processPageTemplate(this._pages[0], (field) => {
            div.appendChild(field.HTMLElement);
        });
        document.body.appendChild(div);
    }
    processPageTemplate(template, fctn) {
        template.configuration.template.forEach((field) => fctn(field));
    }
    static makeSelect(attributes) {
        var select = document.createElement('select');
        core.attributeHelper(select, attributes);
        return select;
    }
    static makeDiv(attributes) {
        var div = document.createElement('div');
        core.attributeHelper(div, attributes);
        return div;
    }
    static makeText(attributes) {
        var input = document.createElement("input");
        core.attributeHelper(input, attributes);
        input.setAttribute("type", "text");
        return input;
    }
    static excludeAttribute(element) {
        return core._excludedAttributes.indexOf(element) <= 0;
    }
    static attributeHelper(element, attributes) {
        var _attr = attributes;
        var _ele = element;
        Object.keys(attributes).forEach((property, value) => {
            if (core.excludeAttribute(property)) {
                _ele.setAttribute(property, _attr[property]);
            }
        });
    }
    isHTMLElement(element) {
        return element && element instanceof HTMLElement;
    }
}
core._excludedAttributes = [
    'includeLabel',
    'label',
    'element',
    'parentElement'
];
var t = new core(pages);
//# sourceMappingURL=core.js.map