//// imports
//import dotenv from "dotenv";
import './lib/loadEnv'
import express from "express";
import database from './database/database'
import mainRoutes from './routes/mainRoutes'

export async function createApp() {

    //// setup
    const db = new database
    await db.connect()

    const app = express()

    //// middleware
    app.use( express.json() );
    app.use( express.urlencoded({extended: true}) )

    //// routes
    mainRoutes(app);
    
    return app

}

//export default app;