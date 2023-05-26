import {resolve} from 'path'
import multer from 'multer'
import { randomUUID } from 'node:crypto'

const TMP_FOLDER = resolve(__dirname,'..','..','tmp')
const UPLOADS_FOLDER = resolve(TMP_FOLDER,'uploads')

 const MULTER = {
    storage: multer.diskStorage({
        destination:TMP_FOLDER,
        filename(request, file,callback){
            const fileHash = randomUUID()
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null,fileName )
        }
    })
}

export {TMP_FOLDER,UPLOADS_FOLDER,MULTER}