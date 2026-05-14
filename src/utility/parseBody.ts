import type { IncomingMessage } from "node:http";

export const parseBody = (req : IncomingMessage):Promise<any> =>{
    return new Promise ((resolved , reject) =>{
        let body = "";
        req.on("data",(chunk) =>{
            body += chunk;
        })
        req.on("end", () =>{
            try {
                resolved(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        })
    })
}