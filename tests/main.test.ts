import app from '../src/app'
import supertest from 'supertest';
import database from '../src/database/database'
import * as testFuncs from './funcs'
import { IVideo, Video } from "../src/database/video"
import * as s3 from '../src/lib/s3'
import fs from 'fs'


let db: database
describe("The Database", () => {
    it("connects", async () => {
        db = new database
        const result = await db.connect()
        expect(result).toBe(true)
    })
})

describe("The App", () => {
    it("loads", async () => {
        expect(app).not.toBe(null)
    })
})

describe("The / route", () => {
    let route = ''

    it("returns a 200 code", async () => {
        const result = await supertest(app).get(route);
        expect(result.statusCode).toEqual(200);
    })
})


//describe("The AWS connection", () => {
//    it("can access AWS", async () => {
//        expect("This test still needs to be written").toBe(0)
//    })
//})

describe("The /upload route", () => {
    let route = '/upload'

    it("uploads a video", async () => {

        // delete the file if it already exists in s3
        const fileExists = await s3.exists('test1');
        if (fileExists) {
            console.log("removing file")
            const scratchReply = await s3.scratch('test1')
            expect(scratchReply).toBe(true)
        } else {
            console.log("there was no file")
        }
        

        // ensure the file does not already exist in s3
        // (making sure our delete above is correct and the test is valid)
        const file1 = await s3.get('test1');
        expect(file1).toBe(false)

        const result = await supertest(app)
            .post(route)
            .attach('video', __dirname + '\\uploadFile.txt')
            .field({ name: 'test1' })

        // check the response is as expected
        expect(result.statusCode).toEqual(200);
        expect( testFuncs.requestResultIsJson(result, true) ).toBe(true)
        let responseData = result.body
        expect(responseData.status).toBe('OK')

        // look for the file in the mongo database (deprec.)
        //const video: (IVideo | null) = await Video.findOne({ name: 'test1' });
        //expect(video).not.toBeNull()

        // look for the file in s3
        const file2 = await s3.get('test1');
        expect(typeof file2).not.toBe('boolean')

    })

})


describe("The /find route", () => {

    it("returns a JSON result", async () => {
        let route = '/find'
        let params = { name : 'test2' }
        let req = supertest(app).get(route).query(params)
        const result = await req
        expect( testFuncs.requestResultIsJson(result, true) ).toBe(true)
    })

    it("returns a specific video", async () => {

        let uploadFile = __dirname + '\\uploadFile.txt'

        // upload a file for testing
        let uploadResult = await supertest(app)
            .post('/upload')
            .attach('video', uploadFile)
            .field({ name: 'test2' })

        // check the response is as expected
        expect(uploadResult.statusCode).toEqual(200);


        // do the /find request and check the result
        let route = '/find'
        let fileName = 'test2'
        let params = { name : fileName }
        const result = await supertest(app).get(route).query(params)
        expect( testFuncs.requestResultIsJson(result, true) ).toBe(true)
        let responseData = result.body
        // check that the file has a name which matches our request
        expect(responseData.file.name).toBe(fileName)

        //check that the returned file contains the test text
        expect( responseData.file.contents ).toBe( fs.readFileSync( uploadFile, {encoding:'utf8', flag:'r'} ) )
    })

})