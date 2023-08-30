import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

const users = [
  {
    id: 1,
    username: "usuario1",
    password: "$2b$10$Qq3sXncZwLHf.LDQbLSjY.BnebRw18djg4DXOoBvxuaBHn7Q0yoNC",
  },
  {
    id: 2,
    username: "usuario2",
    password: "$2b$10$V5NijOgXZeaYcyFl7Li8seGnbTBlSuj8h3b/.AmIcH6tAfRlKdyfG",
  },
];

const AuthController = {
    login: (req,res) =>{
        console.log(req.body);
        const user = users.find((user) =>user.username === req.body.username);
        if (!user){
            return res.status(401).send("credencias invalidas");
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
          return res.status(401).send("credencias invalidas");
        }else{
          const secretkey = 'meuqueridoapp';
          const token = jwt.sign(
             {userid:user.id, permission: "admin"},
             secretkey, 
             {
               expiresIn:"1h",
             });
           return res.status(200).send({message: "usuario encontrado", token});
        }
        // if(user.password === req.body.password){
        //   const secretkey = 'meuqueridoapp';
        //   const token = jwt.sign(
        //     {userid:user.id, permission: "admin"},
        //     secretkey, 
        //     {
        //       expiresIn:"1h",
        //     });
        //   return res.status(200).send({message: "usuario encontrado", token});
        // }else{
        //   return res.status(401).send("credencias invalidas");
        // }
      }
};

export default AuthController;
