import { createServer, IncomingMessage, Server, ServerResponse,} from "node:http";
import { json } from "node:stream/consumers";
import { routeHandler } from "./routes/route";
import config from "./config";


const server : Server = createServer((req : IncomingMessage , res : ServerResponse) =>{
  routeHandler(req , res);
})

server.listen(config.port , () =>{
    console.log(`Server is runing on the port ${config.port}`); 
})