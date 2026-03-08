import express from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import { authToken } from '../middlewears/tokenExcess.js';
import { agents } from '../users/agents.js';
import { adminToken } from '../middlewears/adminAcsess.js';
const secret = process.env.SECRET;

export const authRout = express();

authRout.post('/login',(req, res)=>{

    const {agentCode, password} = req.body;
    if (!agentCode || !password){
        res.status(400).json({message: "igentCode and password are required"})
    }
    const agent = agents.find((a)=> a.agentCode == agentCode && a.password == password);
    if (!agent){
        res.status(401).json({ message: "Invalid credentials" });
    }
    const paylod={agent:agent}
    const token = jwt.sign(paylod, secret, {expiresIn:'15m'})
    res.status(200).json({token:token, user:{id:agent.id, agentCode:agentCode, fullName:agent.name, role:agent.role}})

})

authRout.get('/me', authToken, (req, res)=>{
  const {id, agentCode, name, role} = req.user['agent']  
  
  res.status(200).json({user:{id:id, agentCode:agentCode, fullName:name, role:role}})

})