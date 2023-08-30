import mongoose  from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
mongoose.connect(process.env.URI_MONGO);
mongoose.connection.dropCollection("users");

const userSchema = new mongoose.Schema({
    name: {type: String, index: true},
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    age: Number,
    password: String,    
});

const user = mongoose.model('User', userSchema);

const UserController = {
  createUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const SALT_ROUNDS = 10;
    const hashPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    // mongoose.connect(process.env.URI_MONGO);
    const newUser = new user({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
      password: hashPassword 
    });
    try {
      await newUser.save();
      console.log("Usuário inserido com sucesso!");
      res.status(201).send("createUser");
    } catch (err) {
      console.log("Ocorreu um erro:", Object.keys(err.keyValue)[0]);
      if (Object.keys(err.keyValue)[0] === "username") {
        res.status(409).send("Username já cadastrado!");
      } else if (Object.keys(err.keyValue)[0] === "email") {
        res.status(409).send("Email já cadastrado!");
      }
    }   
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await user.find();
      res.status(200).json(users);  
    } catch (error) {
      res.status(200).send('getallusers')
    }
    //console.log("ENTREI AQUI!");
    //res.status(200).send("getAllUsers");
  },
  updateUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const userid = req.params.id;
    const updateData = req.body;
    try {
      const updatedUser = await user.updateOne({_id: userid, }, updateData);
      if(updatedUser.nModified === 0){
        res.status(404).send("nenhum usuario encontrado no banco")
      }else{
        res.status(200).json({message: "usuario atualizado"})
      }
    } catch (error) {
      console.log('erro', error)
      res.status(200).send(error);  
    }  
  },
  updateUserbody: async (req, res) => {
    console.log("ENTREI AQUI!");
    const userid = req.body.idToBeModified;
    const updateData = req.body.user;
    try {
      const updatedUserbody = await user.updateOne({_id: userid, }, updateData);
      if(updatedUserbody.nModified === 0){
        res.status(404).send("nenhum usuario encontrado no banco")
      }else{
        res.status(200).json({message: "usuario atualizado"})
      }
    } catch (error) {
      console.log('erro', error)
      res.status(200).send(error);  
    }  
  },
  deleteUser: async (req, res) => {
    // mongoose.connect(process.env.URI_MONGO);
    console.log("ENTREI AQUI!");
    const userid = req.params.id;
    try {
      const deleteduser = await user.deleteOne({_id: userid,});
      if(deleteduser.deletedCount === 0){
        res.status(404).send('nenhum usuario encontrado no banco')
      }else{
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
    res.status(204);
  },
  getUser:async (req, res) => {
    //console.log("ENTREI AQUI!");
    const userId = req.params.id;
    try {
      const teste = await user.findById(userId);
      if(teste){
        res.status(200).send(teste)
      }else{
        res.status(404).send('nenhum usuario encontrado no banco')
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    };
  },
};

export default UserController;
