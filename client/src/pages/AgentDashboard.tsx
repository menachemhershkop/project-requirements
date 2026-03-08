import { useEffect, useState } from "react"
import UserCard from "../Components/userCard";


function AgentDashboard() {
  type User = {
    id:number,
    agentCode:string,
    fullName:string,
    role:string
  };
  
  const [user, setUser] = useState<User | null>(null);
    async function getUser():Promise<User> {
      const response = await fetch('http://localhost:3000/auth/me', {
        method:'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (!response.ok){
         const data = await response.json();
  alert(data.message)
      }
      else{
       const date: User = await response.json()
       
       return date
      }
    }
    
  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((err) => console.error(err));
  }, []);

// console.log(user['user'].id);



  
  return (
    <div>
      <UserCard fullName={user['user'].fullName} agentCode={user['user'].agentCode} role={user['user'].role}/>
    </div>
  )
}

export default AgentDashboard
