import express from 'express';
import { authToken } from '../middlewears/tokenExcess.js';
import multer from 'multer';
import csv from 'async-csv';
import cloudinary from '../cloudinary/index.js';
export const reportRout = express();
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ["image/png", "image/jpg", "image/jpeg"];

    if (allowedExtensions.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: multer.memoryStorage(), fileFilter });
function uploadCloudenary(image) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            public_id: "cloudinary-tutorial",
            resource_type: "image",
        },
            (error, result) => {
                if (error) {
                    reject(error)

                }
                else {
                    resolve(result)
                }
            }
        ).end(image);
    })

}

reportRout.post('/', authToken, upload.single('image'), async (req, res) => {

    console.log(req.body);
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
    // imagePath = req.file ? req.file.path : null;
    console.log(1, imagePath);

    return res.status(201).json({ report: { id: id, category: category, urgency: urgency, message: message, imagePath: imagePath, sourceType: 'form', createAt: new Date().toISOString } })
})

reportRout.post('/csv', authToken, upload.single('csvFile'), async (req, res) => {
    const { id } = req.user['agent'];
    if (!req.file) {
        res.status(400).json({ message: 'CSV File are requierd' })
    }
    const csvFile = req.file.buffer.toString('utf-8');

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
    return res.status(201).json({ imprtedCount: reports.length, report: reports })

})