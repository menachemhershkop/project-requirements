import express from 'express';
import cors from 'cors';
import {authRout} from './routs/auth.js'
import 'dotenv/config';
import { reportRout } from './routs/reports.js';
import { adminRout } from './routs/admin.js';
const secret = process.env.SECRET;

const app = express();

app.use(cors());
app.use(express.json())

app.use('/auth', authRout);
app.use('/reports', reportRout);
app.use('/admin', adminRout);
app.get('/',(req,res)=>{
        res.json({msg:'wellcome'})
})
app.listen(3000, ()=>{
    console.log('server listining...');
    
})