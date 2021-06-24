
import express from "express"
import { single as fileUploadSingleMiddleware } from '../lib/multerUpload'
import * as mainController from '../controllers/mainController'

export default function(app: express.Application) {
    
    app.get('/', mainController.index)

    app.post('/upload', fileUploadSingleMiddleware('video'), mainController.upload)
    
    app.get('/find', mainController.find)

    app.get('/dbWrite', mainController.dbWrite)
    
    app.get('/dbRead', mainController.dbRead)

}