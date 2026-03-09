
type User = {
  id: number;
  name: string;
  agentCode: string;
  role: string;
};


function UserData(props:User) {
  return (
    <div className='userCard'>
      <h1>User full name: {props.name}</h1>
      <h3>User Code: {props.agentCode} </h3>
    </div>
  )
}

export default UserData
