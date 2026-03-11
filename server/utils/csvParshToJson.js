import fs from 'fs';
import writeToJson from './write.js';
export default function csvParshToJson(csv, id) {
    const path = './reports/reports.json'
    console.log('az');
    const reportId = JSON.parse(fs.readFileSync(path)).length + 1
    const reports = csv.map((row, index)=>( { id: reportId+index, agentCode: id, category: row.category, urgency: row.urgency, message: row.message, imagePath: row.imagePath })
    )
    return writeToJson(path, reports)
}
