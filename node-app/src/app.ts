//// imports
import dotenv from "dotenv";
import express from "express";
//import database from "./database/database";
import mainRoutes from './routes/mainRoutes'

//// setup
dotenv.config()
const app = express()

//// middleware
app.use( express.json() );
app.use( express.urlencoded({extended: true}) )

//// routes
mainRoutes(app);

export default app;

