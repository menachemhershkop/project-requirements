import { useLocation } from "react-router-dom"
import Reports from "../Components/Reports";
import Back from "../Components/Back";

function NewReportPage() {
  const data = useLocation();
  const id= data.state
  return (
    <div>
     
      <Reports id  ={id}/>
    </div>
  )
}

export default NewReportPage
