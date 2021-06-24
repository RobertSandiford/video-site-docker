import { Request, Response } from 'express';
import * as respond from './respond'
//import { IVideo, Video } from '../database/video';
import * as s3 from '../lib/s3'
import { paramEmpty }  from '../lib/queries'
import { Video, IVideo, IVideoDocument } from '../database/video'

// home page - placeholder
export async function index(req: Request, res: Response): Promise<void> {
    respond.text(res, "Index")
}


// Upload a file
// receives a filename and a file upload
// returns JSON
export const upload = async (req: Request, res: Response): Promise<void> => {
    
    //let video = await Video.create({
    //    name : req.body.name,
    //    video : req.file.path
    //});

    let result = await s3.put(req.body.name, req.file)

    if (result) {
        respond.json(res, { status : "OK" })
    } else {
        respond.json(res, { status : "Failed" })
    }

}


// Get a file
// receives a filename
// returns JSON
export async function find(req: Request, res: Response): Promise<void> {

    if ( paramEmpty(req.query.name) ) {
        respond.json(res, { 
            status : "Error",
            message : "No name parameter provided"
        })
        return
    }

    let name = String(req.query.name)

    if ( ! await s3.exists(name) ) {
        respond.json(res, { 
            status : "Not found",
            message : "File with name '" + name + "' not found"
        })
        return
    }

    let file = await s3.get(name)
    
    // we are assuming that file is being retrieved correctly

    respond.json(res, { 
        status : "OK",
        file : file
    })
    
}


export async function dbWrite(req: Request, res: Response): Promise<void> {

    const videoData: IVideo = {
        name : 'test',
        video : 'placeholder'
    }

    const newVideo = new Video(videoData)

    try {

        let result = await newVideo.save()
        console.log(result)

        return respond.json(res, { 
            status : "Created",
            message : "Video '" + newVideo.name + "' saved to database"
        })

    } catch (e) {

        console.log("Video mongo entry error: " + e)

        return respond.json(res, { 
            status : "Error",
            message : "Error: " + e
        })
        
    }
    
}

export async function dbRead(req: Request, res: Response): Promise<void> {

    try {

        let searchData = { name : 'test' }

        const video: IVideoDocument | null = await Video.findOne( searchData )
        console.log(video)

        if ( video !== null ) {
            
            return respond.json(res, { 
                status : "Found",
                message : "Video '" + video.name + "' found",
                video : video
            })

        } else {
            
            return respond.json(res, { 
                status : "Not Found",
                message : "Video '" + searchData.name + "' not found"
            })

        }

    } catch (e) {

        console.log("Video mongo read error: " + e)

        return respond.json(res, { 
            status : "Error",
            message : "Error: " + e
        })
        
    }
    
}