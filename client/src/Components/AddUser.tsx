import { useState } from "react"
import Back from "./Back";
type AddUserProps = {
  click: () => void;
  close: (value:boolean) => void;
};

function AddUser({ click , close}:AddUserProps) {
  const [name, setName] = useState('');
  const [agentCode, setAgentCode] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('')
  const [send, setSend] = useState(false)
  async function sendUser() {
    const response = await fetch('http://localhost:3000/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ agentCode: agentCode, fullName: name, role: role, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      click()
      setSend(true)
      alert(JSON.stringify(data['user']));
      setMsg('New agent added')
      setTimeout(()=>{
        close(false)
      },5000)
      
    }
    else if (!response.ok) {
      const err = await response.json();
      setMsg(await err);
      alert(err['message'])
    }
  }
  return (
    <div className="add">
      <Back/>
      <form >
        <label htmlFor="name">name: <br />
          <input type="text" required placeholder="Enter agent name" onChange={(e) => setName(e.target.value)} /></label><br />
        <label htmlFor="agent code">agentCode: <br />
          <input type="text" required placeholder="Enter new agent code" onChange={(e) => setAgentCode(e.target.value)} />
        </label> <br />
        <div className="role">
        <label htmlFor="agent-role">agentRole: <br />
        <label htmlFor="agent">agent
          <input type="radio" id={'agent-role'} value={'agent'} name="agent" onChange={(e) => setRole(e.target.value)} />
       </label> <label htmlFor="admin">admin
         </label> <input type="radio" id={'agent-role'} value={'admin'} name="agent" onChange={(e) => setRole(e.target.value)} />
        </label></div><br />

        <label htmlFor="agent pawword">agentCode (optinal): <br />
          <input type="password" placeholder="Enter new paswword" onChange={(e) => setPassword(e.target.value)} />
        </label><br />
        <button onClick={(e) => { e.preventDefault(), sendUser() }}>Add new agent</button>
        {send&& <div className="msg">{msg}</div>}
      </form>
    </div>
  )
}

export default AddUser
