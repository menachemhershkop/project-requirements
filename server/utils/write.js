import fs from 'fs';

export default function writeToJson(file, context){
    const data = fs.readFileSync(file, 'utf-8');
    let obj = JSON.parse(data);
    
    
    obj.push(context);
    fs.writeFile(file, JSON.stringify(obj), (err)=>{
        if (err) throw err;
        console.log('updating');
        
    })
}