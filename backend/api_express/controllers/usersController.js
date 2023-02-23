import Users from "../models/Users.js";
import bcrypt from 'bcryptjs';

export const showUsers = async (req,res)=>{
    try{
        const document = await Users.find({});
        res.json(document);
    } catch (error){
        console.log(error);
    }   
};
export const searchUsers = async (req,res)=>{
    try{
        const { query } = req.params;
        const document = await Users.find({ name: new RegExp(query, 'i')})
        
        res.json(document);
    }catch(error){
        console.log(error);
    }
}

export const showUser = async (req,res)=>{
    const document = await Users.findById(req.params.idUser);
    if(!document){
        res.json({mensaje: 'Ese usuario no existe'})
    }
    res.json(document)
}
export const showUserByUsername = async (req,res)=>{
    try{
        const { username } = req.params;
        const document = await Users.findOne({ username: username})
        
        res.json(document);
    }catch(error){
        console.log(error);
    }
}

export const updateUser = async (req,res)=>{
    try {
        console.log("Datos a modificar", req.body);

        const filter = { _id : req.body._id };
        const {username, name, surname, email, password} =  req.body;
        const options = {new : true};

        let encryptedPassword = ""
        const user = Users.findOne(username)
        if(user.password === password){
            encryptedPassword = password;
        }else{
            encryptedPassword = await bcrypt.hash(password, 10);
        }
        const data = {
            username,
            name,
            surname,
            email: email.toLowerCase(),
            password: encryptedPassword
        }

        const document = await Users.findOneAndUpdate(filter, data, options);
        res.json(document);
    } catch (error) {
        res.send(error);
    }
}
export const loginUser = async (req, res)=>{
    try{
        const {username, password } = req.body;
        if(!(username && password)){
            return res.status(400).json({
                "error":true,
                "message":"All input is required"
            })
        }
        const user = await Users.findOne({username})

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json(user);
        }else{
            console.log("invalid")
            res.status(200).json("invalid")
        }

    }catch(error){
        console.log("invalid credentials");
    }
}

export const registerUser = async (req,res)=>{
    try{
        
        const { username, name, surname, email, password } = req.body;
        // console.log("registerUser", req.body);
        if (!(email && password && name && username)) {
            //res.status(400).send("All input is required");
            return res.status(400).json({
                "error":true,
                "message":"All input is required"
            });
        }
        
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            username,
            name,
            surname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword
        });
        
    }catch(error){
        console.log(error);
    }
}