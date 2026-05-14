import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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
    const products = readProduct();
    try {
      return sendResponse(
        res,
        200,
        true,
        "Products retrived succesfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } else if (method === "GET" && id !== null) {
    // get single product by get method
    const products = readProduct();
    const product = products.find((p: Iproduct) => p.id === id);
    // console.log(product);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found!");
    } else {
      try {
        return sendResponse(
          res,
          200,
          true,
          "This product retrived successfully",
          product,
        );
      } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong", error);
      }
    }
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
    try {
      return sendResponse(res, 200, true, "product created successfully");
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: Iproduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found!");
    } else {
      // console.log(products[index]);
      products[index] = {
        id: products[index].id,
        ...body,
      };
      insertProduct(products);
      try {
        return sendResponse(
          res,
          200,
          true,
          "product updated successfully",
          products[index],
        );
      } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong", error);
      }
    }
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((P: Iproduct) => P.id === id);
    // console.log(index);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found!");
    } else {
      products.splice(index, 1);
      // console.log(products);
      insertProduct(products);
      try {
        return sendResponse(res, 200, true, "Product deleted successfully");
      } catch (error) {
        return sendResponse(res, 500, false, "Something went wrong", error);
      }
    }
  }
};
