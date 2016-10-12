
declare var pages:page;

interface pageConfiguration{
            getData: string;
            postData: string;
            template: Array<any>;
}

interface page {
    pageName:string;
    configuration:pageConfiguration;
}

class coreElement{

    constructor(element:string,makeFunction:any){
        this.element = element;
        this.makeFunction = makeFunction;
    }

    element:string;
    makeFunction: any; 
}

class core{
    private _elementMap:Array<coreElement>;
    private _pages:Array<page>;
    
    private static _excludedAttributes:Array<string> = [
        'includelabel',
        'label',
        'element',
        'parentElement'
    ];
  
    constructor(pages:any){       
        this._pages = pages;
        this.init();

     }

private initElementMap():void{
    this._elementMap = new Array<coreElement>();
    this._elementMap.push(new coreElement("select",core.makeSelect));
    this._elementMap.push(new coreElement("text",core.makeText));
    this._elementMap.push(new coreElement("div",core.makeDiv));
}

public getElementMaker(elementName:string):Function{
        var makeElement = this._elementMap.filter((o)=> {
        if(elementName){
            return o.element.toLowerCase() === elementName.toLowerCase();
        }[0]
        return false;
    });

    if(!makeElement[0]){
        return (a:any)=>{ return core.makeDiv(a); };
    }
    return makeElement[0].makeFunction;
}

public createElement(element:any):HTMLElement{
    var makeElement = this.getElementMaker(element.element);
    let result:HTMLElement;

    result = makeElement(element);    
   
   //check if a parent element exists and if the parent element is an object
    if(element.parentElement && typeof element.parentElement === 'object'){
        console.log(element.parentElement)
        let parent = this.createElement(element.parentElement); 
        parent.appendChild(result);
        result = parent;
    }
    
    return result;
}


public init(){
        this._pages.forEach((page)=>console.log("page:",page.pageName,page.configuration));

        var p = this._pages;
        this.initElementMap();
        
        this._pages.forEach((page)=>{ // process each pagetemplate.
            this.processPageTemplate(page,(field:any)=> {
                field.HTMLElement = this.createElement(field);
            });
        });
        
        //////// this is throw away code - just testing the output.
        
        let div = document.createElement('div');
        
        this.processPageTemplate(this._pages[0],(field:any)=>{
            div.appendChild(field.HTMLElement);
        });
        
        document.body.appendChild(div);

        ////////////////////////////////////////////////////////////
}


public processPageTemplate(template:page,fctn:Function){
    template.configuration.template.forEach((field)=>fctn(field));
}

public static makeSelect(attributes:any):HTMLSelectElement{
    var select =  document.createElement('select')
    core.attributeHelper(select,attributes);
    return select;
}

public static makeDiv(attributes:any):HTMLDivElement{
    var div  = document.createElement('div');
    core.attributeHelper(div,attributes);
    return div;
}

public static makeText(attributes:any):HTMLInputElement{
    var input = document.createElement("input");
    core.attributeHelper(input,attributes);
    input.setAttribute("type","text");
    return input;

}

private static excludeAttribute(element:string):boolean{
     return core._excludedAttributes.indexOf(element) <= 0
}

private static attributeHelper(element:HTMLElement,attributes:any){
    var _attr = attributes;
    var _ele = element;
    Object.keys(attributes).forEach((property,value)=>{
        if(core.excludeAttribute(property)){
            _ele.setAttribute(property,_attr[property])
        }

    });
}


}


var t = new core(pages);