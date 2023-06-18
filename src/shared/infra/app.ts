import 'reflect-metadata'
import "express-async-errors";
import '../container'
import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { router } from './http/routes'
import { AppError } from '../Errors/AppError';
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use(
    (error:Error, request:Request, response:Response, next: NextFunction) =>{
        if(error instanceof AppError){
            console.log(error)
            return response.status(error.statusCode).json({
                error:"error",
                message:error.message
            });        
        }
        console.log(error)
        return response.status(500).json({
            status:"error",
            message:`Internal server error - ${error.message}`
        });    
    }
);

export { app }
