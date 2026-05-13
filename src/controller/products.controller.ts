import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";

export const productsController = (req : IncomingMessage , res : ServerResponse) =>{
    const url = req.url;
    const method = req.method;
    const urlParts = url?.split('/');
    // console.log(urlParts);
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;

    // console.log(id, typeof(id));

    if(url === '/products' && method === "GET"){
    //     const products = [
    //         {
    //             id : 1,
    //             name : "Product 1"
    //         },
    //         {
    //             id : 2,
    //             name : "Product 2"
    //         },
    //         {
    //             id : 3,
    //             name : "Product 3"
    //         }
    //     ];

        const products = readProduct();

        res.writeHead(200 , {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "Data retrived succesfully" , data : products}));
    }else if(method === 'GET' && id !== null){
        const products = readProduct();
        const product = products.find((p : Iproduct) => p.id === id);
        // console.log(product);
        res.writeHead(200 , {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "This product retrived successfully" , product : product}));
    }
}