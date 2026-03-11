import { useState } from "react"

function Reports({id}) {
    const [upload, setUpload] = useState('')
    const [message, setMessage] = useState('')
    const [urgency, setUrgency] = useState('')
    const [category, setCategory] = useState('')
    const handleSubmit =async (e)=>{
        e.preventDefault();
        // if (!upload){
        //     console.log(1);
            
        //     alert("Select File nedded");
        // return;}
        const formData = new FormData();
       
        formData.append("id", id)
        formData.append("image", upload)
        formData.append("message", message);
        formData.append("urgency", urgency);
        formData.append("category", category);
         const response = await fetch("http://localhost:3000/reports", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: formData
  });
  if (response.ok){
  const data = await response.json();
  console.log(data);}
  else if (!response.ok){
    const arr = await response.json()
    console.log(arr)
  }
};
    
  return (
   <div>
      <form >
        <select name="urgency" id="urgency" onChange={(e)=>setUrgency(e.target.value)}>
           <option value="" disabled selected>-- Select an option --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
           <option value="" disabled selected>-- Select an option --</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Logistics">Logitics</option>
            <option value="Alert">Alert</option>
        </select>
        <input type="text" onChange={(e)=>setMessage(e.target.value)}/>
        <input type="file" onChange={(e)=>{setUpload(e.target.files[0])}}/>
        <button onClick={handleSubmit}>Upload</button>
      </form>
    </div>
  )
}

export default Reports
