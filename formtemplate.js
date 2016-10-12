var pages =
    [{
        pageName: "page1",
        configuration: {
            getData: "",
            postData: "",
            template: [{
                "id": "isperson",
                "includelabel":false
            },
            {
                "id": "first_name",
                "label":"First name",
                "element":"text",
                "parentElement":{ // object or id (string) of parent element ?
                    "id":"firstnamediv",
                    "element":"div"
                },
                "data-validation": "required", // or regex
                "data-dependson":[{"isperson":true}],
                "includelabel": true
            },
            {
                "id": "surname",
                "element":"select",
                "parentElement":"body",
                "data-validation": "required", // or regex
                "data-dependson": [{"isperson":true}],
                "includelabel": true
        }
            ]
        }
    }];