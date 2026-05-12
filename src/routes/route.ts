import type { IncomingMessage, ServerResponse } from "node:http";
import { productsController } from "../controller/products.controller";

export const routeHandler = (req : IncomingMessage , res : ServerResponse) =>{
    const url = req.url;
    const method = req.method;

    // its send plain text 
    /*if(url === '/' && method === 'GET'){
        // console.log("This is Root route"); 
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("This is root route")
    }else{
        res.writeHead(404 , {"content-type" : 'text/plain'});
        res.end("Route not found");
    }*/

    // now send json data

    if(url === '/' && method === 'GET'){
        res.writeHead(200 , {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "This is root route"}))
    }else if(url?.startsWith('/products')){
        productsController(req , res);
    }else{
        res.writeHead(404 , {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "Route not found"}));
    }
}