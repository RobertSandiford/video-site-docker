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

        const uri = (process.env.mongo_db_url!) + '?retryWrites=true&w=majority'
        
        if (this.db) {
            console.log('Connect: Database connection already exists')
            return false
        }

        try {
            await mongoose.connect(uri, {
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