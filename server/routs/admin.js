import express from 'express';
import { authToken } from '../middlewears/tokenExcess.js';
import { adminToken } from '../middlewears/adminAcsess.js';

import { agents } from '../users/agents.js';
import atbash from '../utils/atbash.js';

export const adminRout = express()


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
        agents.push({id:agents.length+1, agentCode:agentCode, name:fullName, password:password, role:role})
            res.status(201).json({user:{id:agents.length+1, agentCode:agentCode, fullName:fullName, role:role, initialPasswordHint:'Atbash if not any anuther password'}})
        
}})

adminRout.get('/users', authToken, adminToken, (req,res)=>{
    res.status(200).json({users:agents})
})