import mongoose from "mongoose";

/////////////////////////
/////////////////////////
// We are not using this (yet)
/////////////////////////
/////////////////////////

export default class database {
    connection!: mongoose.Connection

    //constructor() {
    //
    //}
    
    async connect(this: database): Promise<boolean> {

        console.log("Attempting to connect to MongDB database")

        if (this.connection) {
            console.log('Connect: Database connection already exists')
            return false
        }

        const env = process.env.environment || 'dev'
        console.log('env', env)
        
        const mongo_db_host = (env === 'dev') ? process.env.mongo_db_host_dev : process.env.mongo_db_host
        const mongo_db_port = (env === 'dev') ? process.env.mongo_db_port_dev : process.env.mongo_db_port
        const mongo_db_user = (env === 'dev') ? process.env.mongo_db_user_dev : process.env.mongo_db_user
        const mongo_db_pass = (env === 'dev') ? process.env.mongo_db_pass_dev : process.env.mongo_db_pass
        const mongo_db_auth_database = (env === 'dev') ? process.env.mongo_db_auth_database_dev : process.env.mongo_db_auth_database
        const mongo_db_database = (env === 'dev') ? process.env.mongo_db_database_dev : process.env.mongo_db_database

        let mongo_db_uri 
            = `mongodb://${mongo_db_user}:${mongo_db_pass}@${mongo_db_host}:${mongo_db_port}/${mongo_db_auth_database}`
            + `?retryWrites=true&w=majority`

        try {

            console.log(mongo_db_uri)

            await mongoose.connect(mongo_db_uri, {
                dbName: mongo_db_database,
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })

            this.connection = mongoose.connection

            console.log('Connected to database')
            return true
            
        } catch (e) {
            console.log('Error connecting to database: ' + e)
            return false
        }
    }

    async disconnect(this: database): Promise<boolean> {
        if (!this.connection) {
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