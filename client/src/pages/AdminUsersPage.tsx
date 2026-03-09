import { useEffect, useState } from "react"
import UserData from "../Components/UserData";
import AddUser from "../Components/AddUser";
type User = {
  id: number;
  name: string;
  agentCode: string;
  role: string;
};


function AdminUsersPage() {
  const [add, setAdd] = useState(false)
  const [users, setUsers] = useState<User>([])
  useEffect(() => {
        fetch('http://localhost:3000/admin/users', {
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
            setUsers(data.users);
            
            })
            .catch((error) => {
            
              alert(error)
        });
    }, []);

  console.log(users);
  
 
  return (
    <div>
      <button onClick={()=> setAdd(!add)}>Add user</button>
      {add && <AddUser/>}
      {users.map((user)=>{
        return(
          <UserData name={user.name} agentCode={user.agentCode}/>
        )

      })}

    </div>
  )
}

export default AdminUsersPage
