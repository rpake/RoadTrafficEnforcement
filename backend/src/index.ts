import express from 'express';import cors from 'cors';import helmet from 'helmet';import rateLimit from 'express-rate-limit';
const app=express();app.use(helmet());app.use(cors({origin:false}));app.use(express.json({limit:'32kb'}));app.use(rateLimit({windowMs:60000,limit:60}));
app.get('/api/health',(_req,res)=>res.json({status:'ok',mode:'starter-only',officialRegistry:false}));
app.get('/api/fines',(_req,res)=>res.status(501).json({error:'Official fine schedule not configured'}));
app.all('/api/violations',(_req,res)=>res.status(501).json({error:'Authorized authentication and server validation not configured'}));
app.use((_req,res)=>res.status(404).json({error:'Not found'}));
const port=Number(process.env.PORT||4000);app.listen(port,()=>console.log(`RTE starter listening on ${port}`));
