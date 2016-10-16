var pages =
    [{
        pageName: "page1",
        configuration: {
            getData: "",
            postData: "",
            template: [{
                "id": "isperson",
                "includeLabel":false
            },
            {
                "id": "first_name",
                "label":"First name",
                "element":"text",
                "parentElement":{ // object or id (string) of parent element ?
                    "id":"firstnamediv",
                    "element":"div",
                    "parentElement":{
                       "id": "parentparentdiv",
                       "element":"div"
                    }
                },
                "data-validation": "required", // or regex
                "data-dependson":[{"isperson":true}],
                "includeLabel": true
            },
            {
                "id": "surname",
                "element":"select",
                "parentElement":"body",
                "childElement":"",
                "data-validation": "required", // or regex
                "data-dependson": [{"isperson":true}],
                "includeLabel": true
        }
            ]
        }
    }];