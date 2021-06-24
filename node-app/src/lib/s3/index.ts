import '../../lib/loadEnv'

import { S3Client, 
        HeadObjectCommand, HeadObjectCommandOutput,
        GetObjectCommand, GetObjectCommandOutput,
        PutObjectCommand,
        DeleteObjectCommand } 
    from '@aws-sdk/client-s3'
    
import fs from 'fs'
import { Express } from 'express'
import { Readable } from 'stream';

import { File } from './types'
import { fileToString } from './funcs'

//const accessKeyId       = process.env.aws_access_key_id
//const secretAccessKey   = process.env.aws_secret_access_key
const bucketName        = process.env.s3_bucket_name
const region            = process.env.s3_bucket_region

const s3Client = new S3Client({
    region,
    //credentials: fromCognitoIdentityPool({
    //    client: new CognitoIdentityClient({ region: region }),
    //    identityPoolId: "IDENTITY_POOL_ID", // IDENTITY_POOL_ID
    //}),
})

export async function head(key: string): Promise<HeadObjectCommandOutput | boolean> {

    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        }
        try {
            const response = await s3Client.send(new HeadObjectCommand(params));
            return response
        } catch (e) {
            if ( e.$metadata.httpStatusCode == 404 ) {
                console.log("When getting file head: file not found");
                console.log(JSON.stringify(e))
            }
            else {
                console.log("Error getting file head: ", e);
                console.log(JSON.stringify(e))
            }
        }
    } catch (e) {
        console.log("Unkown error when trying to get file head: " + e);
    }

    // default
    return false
}

export async function exists(key: string): Promise<boolean> {
    let result = await head(key)
    return (result !== false)
}

export async function get(filename: string): Promise<File | boolean> {

    try {
        const params = {
            Bucket: bucketName,
            Key: filename,
        }
        try {
            const response = await s3Client.send(new GetObjectCommand(params));
            const file: File = {
                name : filename,
                contents: await fileToString(response.Body as Readable)
            }
            return file
        } catch (e) {
            if ( e.$metadata.httpStatusCode == 404 ) {
                console.log("When retrieving file: file not found");
            }
            else {
                console.log("Error retrieving file: ", e);
                console.log(JSON.stringify(e))
            }
        }
    } catch (e) {
        console.log("Unkown error when trying to retrieve file: " + e);
    }

    // default
    return false
}

export async function put(key: string, file: Express.Multer.File): Promise<boolean> {
    
    //console.log("S3 file uploading is currently blocked")
    //return false

    try {
        const fileStream =  fs.createReadStream(file.path)

        const params = {
            Bucket: bucketName,
            Key: key,
            Body: fileStream
        };
        try {
            const response = await s3Client.send(new PutObjectCommand(params));
            return true
        } catch (e) {
            console.log("Error uploading file: ", e);
        }
    } catch (e) {
        console.log("Unkown error when trying to upload file: " + e);
    }

    // default
    return false
}

export async function scratch(key: string): Promise<boolean> {

    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };
        try {
            const response = await s3Client.send(new DeleteObjectCommand(params));
            return true
        } catch (e) {
            console.log("Error deleting file: ", e);
        }
    } catch (e) {
        console.log("Unkown error when trying to delete file: " + e);
    }

    // default
    return false
}

