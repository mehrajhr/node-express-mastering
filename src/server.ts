import { createServer, IncomingMessage, Server, ServerResponse,} from "node:http";
import { json } from "node:stream/consumers";


const server : Server = createServer((req : IncomingMessage , res : ServerResponse) =>{
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
        res.writeHead(200, {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "This is products route"}));
    }else{
        res.writeHead(404 , {"content-type" : "application/json"});
        res.end(JSON.stringify({message : "Route not found"}));
    }
})

server.listen(3000 , () =>{
    console.log("Server is runing on the port 3000"); 
})