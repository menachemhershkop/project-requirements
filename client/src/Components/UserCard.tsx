type User = {
    id:number,
    agentCode:string,
    fullName:string,
    role:string
  };
function UserCard(props:User) {
    console.log(123, props);
    
  return (
    <div className="user-card">
        
      <h1>Wellcome: {props.fullName}</h1>
      <p>Agentcode: {props.agentCode}</p>
      <p>role: {props.role}</p>
    </div>
  )
}

export default UserCard
