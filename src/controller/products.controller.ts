import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productsController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  // console.log(urlParts);
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // console.log(id, typeof(id));

  if (url === "/products" && method === "GET") {
    // get all products by get method
    // const products = [
    //     {
    //         id : 1,
    //         name : "Product 1"
    //     },
    //     {
    //         id : 2,
    //         name : "Product 2"
    //     },
    //     {
    //         id : 3,
    //         name : "Product 3"
    //     }
    // ];

    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "Data retrived succesfully", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    // get single product by get method
    const products = readProduct();
    const product = products.find((p: Iproduct) => p.id === id);
    // console.log(product);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "This product retrived successfully",
        product: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    // create product by post method
    const body = await parseBody(req);
    const products = readProduct();
    // console.log(body);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product created successfully",
        data: products,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: Iproduct) => p.id === id);
    // console.log(index);
    if(index < 0){
        res.writeHead(404, {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "Product not found"}));
    }else{
        // console.log(products[index]);
        products[index] = {
            id : products[index].id , 
            ...body
        };
        insertProduct(products);
        res.writeHead(200 , {"content-type" : "application/json"});
        res.end(JSON.stringify({
            message : "Product updated successfully",
            data : products[index]
        }))
    }
  }
};
