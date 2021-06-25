//// imports
//import * as dotenv from "dotenv";
import './lib/loadEnv'
import { createApp } from './app'

const start = async () => {

    //// config
    const port = Number(process.env.port)
    if (isNaN(port)) { console.log("No port, exiting"); process.exit() }

    const app = await createApp()

    //// start listening
    app.listen(port, () => console.log("App listening on port " + port));

}

start()