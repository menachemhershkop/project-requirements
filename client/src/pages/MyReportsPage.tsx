import { useEffect, useState } from "react";
type Reports = {
  id:number,
  category:string,
  urgency:string,
  message:string,
  imagePath:string|null
}
function MyReportPage() {
  const [reports, setReports] = useState<Reports[]>([])
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');
  const [filter, setFilter] = useState(false)
  const list = ()=>{
    
    fetch('http://localhost:3000/reports', {
      method:'GET',
      headers:{
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setReports(data.reports);
    })
    .catch((error) => {
      
      console.log
      (error)
    });
  }
  useEffect(() => {
    list()
    console.log(reports);
    
    }, []);
  return (
    <div>
      <form>
        <select name="urgency" id="urgency" onChange={(e)=>{setUrgency(e.target.value), setFilter(true)}}>
           <option value="" disabled selected>-- Select an option --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <select name="category" id="category" onChange={(e)=>{setCategory(e.target.value), setFilter(true)}}>
           <option value="" disabled selected>-- Select an option --</option>
            <option value="Intelligence">Intelligence</option>
            <option value="Logistics">Logitics</option>
            <option value="Alert">Alert</option>
        </select>
        <button onClick={()=>{setFilter(false), setCategory(''), setUrgency('')}}>Clear</button>
      </form>
     <table>
      <thead>
        <tr>
          <th>id</th>
          <th>agentCode</th>
          <th>category</th>
          <th>message</th>
          <th>image</th>
        </tr>
      </thead>
      <tbody>
        {!filter && reports.map((report)=>{
          // console.log(user);
          return (
          <tr>
            <td>{report.id}</td>
            <td>{report.category}</td>
            <td>{report.urgency}</td>
            <td>{report.message}</td>
            <td>{<img src={report.imagePath} alt="" />}</td>
          </tr>)
        })}
        {filter&& reports.filter((r)=> r.category == category || r.urgency == urgency).map((report)=>{
          // console.log(user);
          return (
          <tr>
            <td>{report.id}</td>
            <td>{report.category}</td>
            <td>{report.urgency}</td>
            <td>{report.message}</td>
            <td>{<img src={report.imagePath} alt="" />}</td>
          </tr>)
        })}
      </tbody>
    </table>
    </div>
  )
}

export default MyReportPage
