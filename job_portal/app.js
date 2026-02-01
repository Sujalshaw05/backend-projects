import express from 'express'
// const express = require('express')
import {getjob,getcandidate,getaplicant,insertaplicant,insertcandidate,insertjob} from './database.js'
const app=express()
app.use(express.json())
app.get("/getjob", async(req,res)=>{
    const result= await getjob()
    res.send(result)
})
app.get("/getcandidate", async(req,res)=>{
    const result= await getcandidate()
    res.send(result)
})
app.get("/getaplicant", async(req,res)=>{
    const result= await getaplicant()
    res.send(result)
})
app.post("/postjob", async(req,res)=>{
    const {title,description,location}=req.body
    const result= await insertjob(title,description,location)
     res.status(201).json(result);
})
app.post("/postaplicant", async(req,res)=>{
    const {jobId,candidateId}=req.body
    const result= await insertaplicant(jobId,candidateId)
     res.status(201).json(result);
})
app.post("/postcandidate", async(req,res)=>{
    const {name,email,resumeLink}=req.body
    const result= await insertcandidate(name,email,resumeLink)
     res.status(201).json(result);
})

const port=8000;
app.listen(port,()=>{
    console.log(`server is listning at port ${port}`);
    
})