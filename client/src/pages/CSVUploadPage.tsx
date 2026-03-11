import { useState } from "react"

function CSVUploadPage() {
  const [csvFile, setCsvFile] = useState('')
  
  const sendFile = async ()=>{
    const formData = new FormData();
    formData.append('csvFile', csvFile);
  const response =  await fetch('http://localhost:3000/reports/csv', {
      method: 'POST',
      headers: {
 
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    })
    const data= await response.json()
    console.log(data)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(csvFile);
    
    sendFile()
  }
  return (
    <div>
      123
      <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={(e)=>setCsvFile(e.target.files[0])}/>
      <button>submit</button>
      </form>
    </div>
  )
}

export default CSVUploadPage
