//// imports
//import * as dotenv from "dotenv";
import './lib/loadEnv'
import server from './app'

//// config
const port = Number(process.env.port)
if (isNaN(port)) { console.log("No port, exiting"); process.exit() }

//// start listening
server.listen(port, () => console.log("App listening on port " + port));