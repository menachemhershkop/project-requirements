import { useState } from "react"
import Back from "./Back"
import { useNavigate } from "react-router-dom"
type UserNunber={
  id:number
}
function Reports({id}:UserNunber) {
    const [upload, setUpload] = useState('')
    const [message, setMessage] = useState('')
    const [urgency, setUrgency] = useState('')
    const [category, setCategory] = useState('')
    const [send, setSend] = useState('')
    const navigate = useNavigate();
    const rank = localStorage.getItem('rank')
    const handleSubmit =async (e)=>{
        e.preventDefault();
        
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
  setSend('msg send')
  console.log(data);
    setTimeout(()=>{
      if (rank== 'agent') navigate('/AgentDashboard');
  
   else if (rank == 'admin') navigate('/adminDashboard')
    }, 5000)
}
  else if (!response.ok){
    const arr = await response.json()
    alert(arr.message)
  }
};
    
  return (
   <div>
    <Back/>
      <form className="report">
        <label htmlFor="urgancy">Urgancy: <br />
        <select name="urgency" id="urgency" onChange={(e)=>setUrgency(e.target.value)}>
           <option value="" disabled selected>-- Select urgancy Level --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        </label>
        <label htmlFor="category">Category: <br />
        <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
           <option value="" disabled selected>-- Select categoty --</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Logistics">Logitics</option>
            <option value="Alert">Alert</option>
        </select>
        </label>
        <label htmlFor="msg">Message: <br />
        <input type="text" name="msg" onChange={(e)=>setMessage(e.target.value)}/>
        </label>
        <label htmlFor="img">Add image (optional): <br />
        <input type="file" id={"img"} onChange={(e)=>{setUpload(e.target.files?.[0])}}/>
        </label>
        <button onClick={handleSubmit}>Upload</button>
      </form>
      <div className="send">{send}</div>
    </div>
  )
}

export default Reports
