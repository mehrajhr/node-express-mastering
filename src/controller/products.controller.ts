import type { IncomingMessage, ServerResponse } from "node:http";

export const productsController = (req : IncomingMessage , res : ServerResponse) =>{
    const url = req.url;
    const method = req.method;

    if(url === '/products' && method === "GET"){
        const data = [
            {
                id : 1,
                name : "Product 1"
            },
            {
                id : 2,
                name : "Product 2"
            },
            {
                id : 3,
                name : "Product 3"
            }
        ];

        res.writeHead(200 , {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "Data retrived succesfully" , data}));
    }
}