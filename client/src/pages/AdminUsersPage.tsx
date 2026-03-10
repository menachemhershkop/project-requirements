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
  const [users, setUsers] = useState<User[]>([])
  const [refrash, setRefrash] =useState(0)
  const reload = ()=>setRefrash(prev=>prev+1)
  const list = ()=>{

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
      // setFlag(true)
      })
      .catch((error) => {
      
        console.log
        (error)
  });
}
  useEffect(() => {
    list()
    console.log(users);
    }, [refrash]);

  
 
  return (
    <div>
      <div>
      <button onClick={()=> setAdd(!add)}>Add user</button>
      {add && <AddUser click={reload}/>}</div>
      {/* {users.map((user)=>{
        return(
          <UserData name={user.name} agentCode={user.agentCode}/>
        )

      })} */}
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>igentCode</th>
          <th>name</th>
          {/* <th>password</th> */}
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user)=>{
          // console.log(user);
          return (
          <tr>
            <td>{user.id}</td>
            <td>{user.agentCode}</td>
            <td>{user.name}</td>
            {/* <td>{user.password}</td> */}
            <td>{user.role}</td>
          </tr>)
        })}
      </tbody>
    </table>
    </div>
  )
}

export default AdminUsersPage
