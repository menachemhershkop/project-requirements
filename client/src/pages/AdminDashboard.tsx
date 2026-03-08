import { useEffect, useState } from "react";
import UserCard from "../Components/userCard";


function AdminDashboard() {
  type Admin = {
    id:number,
    agentCode:string,
    fullName:string,
    role:string
  };
  
  const [user, setUser] = useState<Admin | null>(null);
    async function getUser():Promise<Admin> {
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
       const data: Admin = await response.json()
       
       return data['user']
      }
    }
    
  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((err) => console.error(err));
  }, []);

// console.log(user['user'].id);
  if (!user){
    return <p>Access denaied</p>
  }


  
  return (
    <div>
      <UserCard id={user.id} fullName={user.fullName} agentCode={user.agentCode} role={user.role}/>
    </div>
  )
}

export default AdminDashboard
