import { useState } from "react"


function AddUser({ click }) {
  const [name, setName] = useState('');
  const [agentCode, setAgentCode] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('')
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
      console.log(data['user']);

    }
    else if (!response.ok) {
      const err = await response.json();
      setMsg(await err);
      alert(err['message'])
    }
  }
  return (
    <div className="add">

      <form action="">
        <label htmlFor="name">name: <br />
          <input type="text" required placeholder="Enter agent name" onChange={(e) => setName(e.target.value)} /></label>
        <label htmlFor="agent code">agentCode: <br />
          <input type="text" required placeholder="Enter new agent code" onChange={(e) => setAgentCode(e.target.value)} />
        </label>
        <label htmlFor="agent-role">agentRole: <br />
          <input type="radio" id={'agent-role'} value={'agent'} name="agent" onChange={(e) => setRole(e.target.value)} />
          <input type="radio" id={'agent-role'} value={'agent'} name="agent" onChange={(e) => setRole(e.target.value)} />
        </label>

        <label htmlFor="agent pawword">agentCode <br />
          <input type="password" placeholder="Enter new paswword" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={(e) => { e.preventDefault(), sendUser() }}>Add new agent</button>
      </form>
    </div>
  )
}

export default AddUser
