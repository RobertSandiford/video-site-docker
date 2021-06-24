import { Request, Response } from 'express'

export function text(res: Response, text: string) {
    res.status(200)
    res.send(text)
}

export function json(res: Response, data: object) {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.send( JSON.stringify(data) )
}