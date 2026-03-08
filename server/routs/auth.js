import express from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import { authToken } from '../middlewears/tokenExcess.js';
const secret = process.env.SECRET;

export const authRout = express();

authRout.post('/login',(req, res)=>{
    const {agentCode, password} = req.body;
    const paylod={user:agentCode, password:password}
    const token = jwt.sign(paylod, secret, {expiresIn:'15m'})
    res.status(200).json({token:token, uset:{id:1, agentCode:agentCode, fullName:'dani', role:"Agent"}})
})

authRout.get('/me', authToken, (res, req)=>{
    
    req.send('wellcome')
})