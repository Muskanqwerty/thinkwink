const express=require('express');
const {Sequelize,DataTypes} = require('sequelize')
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken')

const app=express();
const PORT=3000;

app.use(bodyParser.json());

const sequelize= new Sequelize('assignment','root','root',{
    host:'localhost',
    dialect:'mysql'
});
   
const admin=sequelize.define('Admin',{
    username:DataTypes.STRING,
    password:DataTypes.STRING
});



const users=sequelize.define('Users',{
    username:DataTypes.STRING,
    password:DataTypes.STRING
});

sequelize.sync().then(()=>console.log('Models are prsent in databse'))
.catch((err)=>(console.log('Error',err)));


sequelize.sync().then(()=>console.log('Models are prsent in databse'))
.catch((err)=>(console.log('Error',err)));

app.get('/admin',async(req,res)=>{
    try{
        const adminData=await admin.findAll();
        res.json(adminData);
    }catch(err){
        res.status(500).send(err);
    }
});

app.post('/admin',async(req,res)=>{
    try{
        const {username,password}= req.body;

        const adminCreate=await admin.create({username,password});
        const token=jwt.sign(adminCreate,SECRETKEY='12345',{expiresIn:"2d"})

        res.json(adminCreate,token);
    }catch(err){
        res.status(500).send(err);
    }
})


app.get('/users',async(req,res)=>{
    try{
        const userData=await users.findAll();
        res.json(userData);
    }catch(err){
        res.status(500).send(err);
    }
});

app.post('/users',async(req,res)=>{
    try{
        const {username,password}= req.body;
        const userCreate=await users.create({username,password});
        console.log(userCreate);

        res.json(userCreate);
    }catch(err){
        res.status(500).send(err);
    }
})

app.put('/users/:id',async(req,res)=>{
    try{
        const userID=req.params.id;
        const {username,password}= req.body;
        const userUpdate=await users.update({username},{where:{id:userID}});

        res.json(userUpdate);
    }catch(err){
        res.status(500).send(err);
    }
});


app.delete('/users/:id',async(req,res)=>{
    try{
        const userID=req.params.id;
        const userDelete=await users.delete({where:{id:userID}});

        res.json(userDelete);
    }catch(err){
        res.status(500).send(err);
    }
})





app.listen(PORT,()=>{
    console.log(`Server is listeining at ${PORT}`);
})