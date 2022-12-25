import { Router } from "express";
import SC from "../models/ScoreCard.js";

import ScoreCard from "../models/ScoreCard.js";

const router = Router();

router.delete("/cards", async(_,res)=>{

    //delete database
    //Hint: 
    try{
        await ScoreCard.deleteMany({});
        console.log("Database deleted")
        res.send({message:"Database cleared"})
    }
    catch(error){
        throw new Error("User creation error" +error)
    }
    //1. ScoreCard.deleteMany({});
    //2. res.send({...});
});
router.post("/card", async (req,res)=>{
    
    //add/update element
    //Hint:
    const data=req.body;
    console.log(req.body)
    
    const exsiting =await SC.findOne({name:req.body.name,subject:req.body.subject});
    try { 
        if(exsiting){
        await SC.updateOne({name:data.name,subject:data.subject},{$set:{score:data.score}})
        res.send({card:true,message:`Updating (${data.name}, ${data.subject}, ${data.score})`})
    }
    else{
        const newSC=new SC({name:data.name,subject:data.subject,score:data.score})
        res.send({card:true,message:`Adding (${data.name}, ${data.subject}, ${data.score})`})
        return newSC.save();
    }
    }catch(e){
        res.send({card:false,message:`can't add nor updating card`})
        console.log(e)
       
    }
    //1. get data: req.body
    //2. find an element: ScoreCard.findOne(filter);    filter = {name: somename, ...}
    //3. update element: ScoreCard.findOneAndUpdate(filter, update, {new:true})     update= {name: newname, ...}
    //4. add element: const newCard = new ScoreCard({ name:cardName, subject:cardSubject, score:cardScore }); return newCard.save();
    //5. res.send({...});
});
router.get("/cards", (req,res)=>{
    //find element in database
    //Hint:
   
    console.log(req.query);
    const dataAll=req.query;
    if(dataAll.type=="name"){
        const findSC=SC.find({name:dataAll.queryString}, (err, data)=>{
            let a=data.map((item)=>{
                return `Found card with name: (${item.name},${item.subject},${item.score})`
            })
            console.log(a);
            if(a.length===0){
                
                a=[`${dataAll.type} ${dataAll.queryString} not found!`]
                res.send({message:err,messages:a})
            }
            else{
                res.send({message:err,messages:a})
            }
            
        });
        
            
        }
    else if(dataAll.type=="subject"){
        const findSC=SC.find({subject:dataAll.queryString}, (err, data)=>{
            let a=data.map((item)=>{
                return `Found card with name: (${item.name},${item.subject},${item.score})`
            })
            if(a.length==0){
                a=[`${dataAll.type} ${dataAll.queryString} not found!`]
                console.log(err)
                console.log("///////----")
                res.send({message:err,messages:a})
            }
            else{
                res.send({message:err,messages:a})
            }
        });
    }
    
    //1. get data: req.query
    //2. find many elements: ScoreCard.find(filter,(error,data)=>{...});    data is the result
    //3. res.send({...});    
    });
    


export default router;