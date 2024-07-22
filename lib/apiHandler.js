//1. import http module
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');


let customers = [
    // Existing objects
    {
        id: 1,
        firstName: 'Alice',
        lastName: 'Johnson',
        phone: '123-456-7890',
        account: 'Savings'
    },
    {
        id: 2,
        firstName: 'Bob',
        lastName: 'Smith',
        phone: '987-654-3210',
        account: 'Checking'
    },
    // New objects
    {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Brown',
        phone: '555-123-4567',
        account: 'Investment'
    },
    {
        id: 4,
        firstName: 'David',
        lastName: 'Lee',
        phone: '777-888-9999',
        account: 'Credit Card'
    },
    {
        id: 5,
        firstName: 'Eva',
        lastName: 'Garcia',
        phone: '111-222-3333',
        account: 'Mortgage'
    }
    // Add more customer objects here if needed
];

const custApi = "/api/v1/customers";
//2. create server
const handleApiRequest = ((request, response) => {
    //3. create default response
    //console.log("request ",request);
    response.setHeader("Content-Type", "application/json");
    let parseUrl = url.parse(request.url.toLowerCase(), true);
    console.log("url ", parseUrl);
    let urlInfo = brakeURL(parseUrl.pathname);
    let res = { result: "endpoint not found" };
    let method = request.method.toLowerCase();
    console.log(urlInfo);
    var defRes = true;
    switch (urlInfo.ctrl) {
        case "customers":
            let param = urlInfo.param;
            let index = -1;
            if(param)
            {
                index= customers.map(c => c.id.toString()).indexOf(param);
            }
            switch (method) {
                case "get":
                    if (param.length > 0) {
                        console.log("param", param);
                        let num = parseInt(param);
                        if (!isNaN(num)) {
                            console.log(`finding ${param} by id`);
                            res = customers.filter((x) => x.id == num);
                        }
                        else {
                            console.log(`finding ${param} by name`);
                            res = customers.filter((x) => { return x.firstName.toLowerCase() === param || x.lastName.toLowerCase() === param });
                        }
                    }
                    else {
                        res = customers;
                    }
                    break;
                case "post":
                    defRes = false;
                    console.log("post recieved");
                    res = { result: "post recieved" };
                    request.on('data', (data) => {
                        let str = data.toString();
                        console.log("data from post: ", str);
                        if (str) {
                            let id = Math.max.apply(null,
                                customers.map(function (c) { return c.id; }));
                            id = id + 1;
                            let obj = JSON.parse(str);
                            obj.id = id;
                            customers.push(obj);
                            fs.writeFileSync("customers.json", JSON.stringify(customers));
                            res = obj;
                        }
                        else {
                            res = { result: "no data" };
                        }
                        response.end(JSON.stringify(res));

                    });
                    break;
                    case "put":
                        defRes = false;
                        console.log("put recieved");
                        res = { result: "put recieved" };
                        
                        if(index < 0){
                            res = { result: "not found "+ index };
                            response.end(JSON.stringify(res));
                        }
                        request.on('data', (data) => {
                            let str = data.toString();
                            console.log("data from put: ", str);
                            if (str) {
                                let obj = JSON.parse(str);
                                obj.id = parseInt(param);
                                customers[index]=obj ;
                                fs.writeFileSync("customers.json", JSON.stringify(customers));
                                res = obj;
                            }
                            else {
                                res = { result: "no data" };
                            }
                            response.end(JSON.stringify(res));
                        });
                    break;
                    case "delete":
                        console.log("delete "+ param);

                        if(index < 0){
                            res = { result: "not found "+ index };
                            response.end(JSON.stringify(res));
                        }
                        else{
                            customers.splice(index,1);
                            res = { result: `Deleted ${param} on ${index}` };
                            fs.writeFileSync("customers.json", JSON.stringify(customers));

                        }
                    break;

            }
            break;
        default:
            response.statusCode = 404;
            break;
    }
    if (defRes) {
        response.end(JSON.stringify(res));
    }


});


function brakeURL(pathName) {
    const urlInfo = {
        t: "",
        ver: "",
        ctrl: "",
        param: ""


    };
    if (pathName) {
        let splt = pathName.split("/")
        if (splt.length > 1) {
            urlInfo.t = splt[1];
        }
        if (splt.length > 2) {
            urlInfo.ver = splt[2];
        }
        if (splt.length > 3) {
            urlInfo.ctrl = splt[3];
        }
        if (splt.length > 4) {
            urlInfo.param = splt[4];
        }
    }
    return urlInfo;
}
module.exports = { handleApiRequest };
