import fs from 'fs';

export default function writeToJson(file, context){
    console.log(9);
    
    const data = fs.readFileSync(file, 'utf-8');
    let obj = JSON.parse(data);
    
    
    obj.push(context);
    fs.writeFileSync(file, JSON.stringify(obj, null , 2), (err)=>{
        if (err) throw err;
        console.log('updating');
        
    })
}