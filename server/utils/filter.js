import fs from 'fs';

export function filterId(file, id){
    console.log(3);
    
    const data =JSON.parse( fs.readFileSync(file, 'utf-8'));
    if (id == 'admin'){
        return data;
    }
    // console.log(data);
    console.log(4);
    
    const filtered = data.filter(data=> data.id ==id)
    console.log(filtered);
    
    return filtered
}

export function filterParms(arr, params){
    const arrFiltered= arr.filter
}