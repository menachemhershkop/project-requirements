import express from 'express';
import { authToken } from '../middlewears/tokenExcess.js';
import { adminToken } from '../middlewears/adminAcsess.js';

import { agents } from '../users/agents.js';

export const adminRout = express()

function atbash(text) {
  const abc = "abcdefghijklmnopqrstuvwxyz";
  const reversed = "zyxwvutsrqponmlkjihgfedcba";

  return text
    .toLowerCase()
    .split("")
    .map(char => {
      const index = abc.indexOf(char);
      return index !== -1 ? reversed[index] : char;
    })
    .join("");
}

adminRout.post('/users', authToken, adminToken, (req, res)=>{
        const {agentCode, fullName, role} = req.body;
        let {password} = req.body;
        if (!agentCode || !fullName || !role){
            res.status(400).json({message:'Nedded field empty'})
        }
        const uniq = agents.find(agent=>agent.agentCode==agentCode);
        if (uniq){
            res.status(409).json({message:'AgentCode alredy exist'})
        }
        else{
            if (!password){
             password= atbash(fullName)
            }
        agents.push({id:agents.length+1, agentCode:agentCode, fullName:fullName, password:password, role:role})
            res.status(201).json({user:{id:agents.length+1, agentCode:agentCode, fullName:fullName, role:role, initialPasswordHint:'Atbash if not any anuther password'}})
        
}})

adminRout.get('/users', authToken, adminToken, (req,res)=>{
    res.status(200).json({users:agents})
})