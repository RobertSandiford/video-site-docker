import path from 'path'
import fs from 'fs'
import * as dotenv from 'dotenv'

// load service .env (same folder as package.json)
dotenv.config( )

// load project .env (.. folder above package.json)
const projectEnvFile = path.resolve(process.cwd() + '/..', '.env')
const projectEnvBuffer = fs.readFileSync(projectEnvFile)
const projectEnv = dotenv.parse( projectEnvBuffer )

for (const key in projectEnv) {
    if ( ! (key in process.env) )
        process.env[key] = projectEnv[key]
}