import path from "node:path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct = () =>{
    const products = fs.readFileSync(filePath , 'utf-8');
    return JSON.parse(products);
}

export const insertProduct = (payload : any) =>{
    fs.writeFileSync(filePath , JSON.stringify(payload));
}