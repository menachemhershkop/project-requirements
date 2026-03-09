import { useState } from "react"
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [agentCode, setAgentCode] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
async function connect(agentCode:String, password:String){
    const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({agentCode:agentCode, password:password}),
  });
  if (response.ok){
  const data = await response.json();
  localStorage.setItem('token', data.token)
  if(data['user'].role == 'agent'){
  navigate('/AgentDashboard')}
  else if(data['user'].role == 'admin'){
    navigate('/adminDashboard')
  }
}
else{
  const data = await response.json();
  alert(data.message)
  
  
}
}

  return (
    <div className="login">
      <label htmlFor="agentcode">username:
      <input type="text" id="agentcode" onChange={(e)=>setAgentCode(e.target.value)} />
      </label><br />
      <label htmlFor="password">password:
      <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
      </label><br />
      <button onClick={()=> connect(agentCode, password)}>Login</button>
      
    </div>
  )
}

export default LoginPage
