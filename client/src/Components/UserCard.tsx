type User = {
    id:number,
    agentCode:string,
    fullName:string,
    role:string
  };
function UserCard(props:User) {
    
    
  return (
    <div className="user-card">
        
      <h1>Wellcome: {props.fullName}</h1>
      <p>Agentcode: {props.agentCode}</p>
      <p>role: {props.role}</p>
    </div>
  )
}

export default UserCard
