
import { useNavigate } from 'react-router-dom'

function Back() {
    const navigate = useNavigate();
    const rank = localStorage.getItem('rank')
  return (
    <div>
      <button onClick={()=>{
        if (rank== 'agent') navigate('/AgentDashboard');
  
   else if (rank == 'admin') navigate('/adminDashboard')}}>Back to dashboard</button>
    </div>
  )
}

export default Back

