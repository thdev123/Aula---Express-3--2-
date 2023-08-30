import express from "express";
import Jwt, { decode } from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const chckToken = (req,res,next) =>{
  const token = req.headers['autorization']
  if(token){
    Jwt.verify(token, 'xingling', (err, decode)=>{
      if(err){
        return res.status(401).json({message: "token invalido"});    
      }
    });
    next();
  }else{
    return res.status(404).json({message: "cade o token?"});
  }; 
;}

app.use(express.json());

//app.use("/api", chckToken, userRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);

app.listen(4000, () => {
  console.log("Servidor rodando!");
});
