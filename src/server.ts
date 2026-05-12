import { createServer, IncomingMessage, Server, ServerResponse,} from "node:http";
import { json } from "node:stream/consumers";
import { routeHandler } from "./routes/route";


const server : Server = createServer((req : IncomingMessage , res : ServerResponse) =>{
  routeHandler(req , res);
})

server.listen(3000 , () =>{
    console.log("Server is runing on the port 3000"); 
})