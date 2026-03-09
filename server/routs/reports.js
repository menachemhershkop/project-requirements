import express from 'express';
import { authToken } from '../middlewears/tokenExcess.js';
import multer from 'multer';
import csv from 'async-csv';

const upload = multer({storage:multer.memoryStorage()});
export const reportRout = express();

reportRout.post('/', authToken, upload.none(), (req, res)=>{
    
    console.log(req.body);
    
        const {category, urgency, message} = req.body;
        if (!category || !urgency || !message){
            res.status(400).json({message: 'Fields file less'})
        }
        const {id} = req.user['agent']
        res.status(200).json({report:{id:id, category:category, urgency:urgency, message:message, imagePath:123, scurceType:2314, createAt:new Date().toISOString }})
})

reportRout.post('/csv', authToken, upload.single('CSVFile'), (req, res)=>{
    if (!req.file){
        res.status(400).json({message:'CSV File are requierd'})
    }
    const csvFile = req.file.buffer.toString('utf-8');
    try{
    csv.parse(csvFile, {columns:true})
    }catch (err){
        res.status(400).json({message:'invalid CSV formt'})
    }
    
})