import express from 'express';
import { authToken } from '../middlewears/tokenExcess.js';
import multer from 'multer';
import csv from 'async-csv';
import writeToJson from '../utils/write.js';
import uploadCloudenary from '../cloudinary/upload.js';
import { filterId } from '../utils/filter.js';
import fs from 'fs'
import csvParshToJson from '../utils/csvParshToJson.js';
export const reportRout = express();
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ["image/png", "image/jpg", "image/jpeg", "text/csv"];

    if (allowedExtensions.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: multer.memoryStorage(), fileFilter });
const path = './reports/reports.json';

reportRout.post('/', authToken, upload.single('image'), async (req, res) => {
    const reportId = JSON.parse(fs.readFileSync(path)).length+1
    let imagePath = null
    const { category, urgency, message } = req.body;
    if (!category || !urgency || !message) {
        return res.status(400).json({ message: 'Fields file less' })
    }
    const { id } = req.user['agent']
    if (req.file) { 
        const result  = await uploadCloudenary(req.file.buffer);
        imagePath = result.secure_url
    }
    writeToJson(path, {id:reportId, agentCode: id, category: category, urgency: urgency, message: message, imagePath: imagePath})
    return res.status(201).json({ report: { id: id, category: category, urgency: urgency, message: message, imagePath: imagePath, sourceType: 'form', createAt: new Date().toISOString } })
})

reportRout.post('/csv', authToken, upload.single('csvFile'), async (req, res) => {

    const { id } = req.user['agent'];
    if (!req.file) {

        res.status(400).json({ message: 'CSV File are requierd' })
    }
    const csvFile = req.file.buffer.toString('utf-8');
    console.log(csvFile);
    
    let rows;
    try {
        
        rows = await csv.parse(csvFile, { columns: true, skip_empty_lines: true, trim: true })
        console.log(rows);
    } catch (err) {
       
        res.status(400).json({ message: 'invalid CSV formt' })
    }
    for (const row of rows) {
        
        if (!row.category || !row.urgency || !row.message) {
            return res.status(400).json({ message: 'CSV file must containe category, urgancy and messageF' })
        }
    }
    const reports = rows.map((row) => ({
        id: id, category: row.category, urgency: row.urgency, message: row.message, imagePath: null, sourceType: 'CSV', createAt: new Date().toISOString
    }))
    csvParshToJson(reports, id)
    return res.status(201).json({ imprtedCount: reports.length, report: reports })

})

reportRout.get('/', authToken, (req, res)=>{
    const {id} = req.user['agent'];
    let arr;
    if (req.user['agent'].role == 'admin'){
        arr = filterId(path, 'admin')
    }
    else{
         arr = filterId(path, id);
    }
    return  res.status(200).json({reports:arr})
})