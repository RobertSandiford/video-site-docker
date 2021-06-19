//// imports
import * as dotenv from "dotenv";
import server from './app'
import database from './database/database'

//// setup
dotenv.config()
const db = new database

//// config
const port = Number(process.env.port)
if (isNaN(port)) { console.log("No port, exiting"); process.exit() }

//// start listening
server.listen(port, () => console.log("App listening on port " + port));