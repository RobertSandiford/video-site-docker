import supertest from "supertest";

export function requestResponseCodeIs(result: supertest.Response, code: Number) {
    return result.statusCode == code
}

export function requestResultIsJson(result: supertest.Response, echoOnFailure: boolean = false) {
    if ( result.statusCode != 200 ) { 
        if (echoOnFailure) console.log("requestResponseIsJson: Status code is not 200")
        return false
    }
    if ( ! result.headers['content-type'].includes('application/json') ) { 
        if (echoOnFailure) console.log("requestResponseIsJson: Content type header does not include application/json")
        return false
    }
    if ( typeof result.body != "object" ) {
        if (echoOnFailure) console.log("requestResponseIsJson: result.body is not type object")
        return false
    }
    return true
}