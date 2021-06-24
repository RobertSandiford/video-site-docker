import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";

/////////////////////////
/////////////////////////
// We are not using this (yet)
/////////////////////////
/////////////////////////

export default class database {
    db!: mongoose.Connection

    //constructor() {
    //
    //}
    
    async connect(this: database): Promise<boolean> {

        const mongo_db_host = process.env.mongo_db_host
        const mongo_db_port = process.env.mongo_db_port
        const mongo_db_user = process.env.mongo_db_user
        const mongo_db_pass = process.env.mongo_db_pass
        const mongo_db_database = process.env.mongo_db_database

        const mongo_db_uri 
            = `mongodb://${mongo_db_user}:${mongo_db_pass}@${mongo_db_host}:${mongo_db_port}/${mongo_db_database}`
            + `?retryWrites=true&w=majority`
        
        if (this.db) {
            console.log('Connect: Database connection already exists')
            return false
        }

        try {
            await mongoose.connect(mongo_db_uri, {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })

            this.db = mongoose.connection

            console.log('Connected to database')
            return true
        } catch (e) {
            console.log('Error connecting to database: ' + e)
            return false
        }
    }

    async disconnect(this: database): Promise<boolean> {
        if (!this.db) {
            console.log('Disconnect: No database connection exists')
            return false
        }
        try {
            await mongoose.disconnect()
            return true
        } catch(e) {
            console.log('Error disconnecting to database: ' + e)
            return false
        }
    }

}