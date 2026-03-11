import { useEffect, useState } from "react"
import UserCard from "../Components/userCard";
import Reports from "../Components/Reports";
import { useNavigate } from "react-router-dom";


function AgentDashboard() {
  type User = {
    id:number,
    agentCode:string,
    fullName:string,
    role:string
  };
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
    async function getUser():Promise<User> {
      const response = await fetch('http://localhost:3000/auth/me', {
        method:'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (!response.ok){
         const err = await response.json();
        alert(err.message)
        throw new Error(err.message)
      }
      else{
       const data: User = await response.json()
      
       
       return data['user']
      }
    }
    
  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((err) => console.error(err));
  }, []);



 if (!user){
    return <p>Access denaied</p>
  }
  
  return (
    <div>
      <UserCard id={user.id} fullName={user.fullName} agentCode={user.agentCode} role={user.role}/>
      <Reports id={user.id}/>
      <button onClick={()=>navigate('/MyReportsPage')}>See all my Reports</button>
      <button onClick={()=>navigate('/CSVUploadPage')}>send csv file</button>
    </div>
  )
}

export default AgentDashboard
