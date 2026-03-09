import express from 'express';
import cors from 'cors';
import {authRout} from './routs/auth.js'
import 'dotenv/config';
import { reportRout } from './routs/reports.js';
const secret = process.env.SECRET;

const app = express();

app.use(cors());
app.use(express.json())

app.use('/auth', authRout);
app.use('/reports', reportRout);
app.get('/',(req,res)=>{
        res.json({msg:'wellcome'})
})
app.listen(3000, ()=>{
    console.log('server listining...');
    
})