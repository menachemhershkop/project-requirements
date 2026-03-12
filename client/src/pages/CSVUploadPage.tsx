import { useState } from "react";
import Back from "../Components/Back";
import { useNavigate } from "react-router-dom";

function CSVUploadPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [send, setSend] = useState('')
  const navigate = useNavigate();
    const rank = localStorage.getItem('rank')

  const sendFile = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("csvFile", csvFile);

    const response = await fetch("http://localhost:3000/reports/csv", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    setSend('file send')
  console.log(data);
    setTimeout(()=>{
      if (rank== 'agent') navigate('/AgentDashboard');
  
   else if (rank == 'admin') navigate('/adminDashboard')
    }, 5000)
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(csvFile);
    sendFile();
  };

  return (
    <div className="csv-reports">
      <Back />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0] || null;
            setCsvFile(file);
          }}
        />
        <button type="submit">submit</button>
      </form>
      <div className="send">{send}</div>
    </div>
  );
}

export default CSVUploadPage;