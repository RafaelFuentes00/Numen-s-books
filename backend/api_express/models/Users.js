import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String, 
    },
    rol:{
        type:String,
        enum: ['STANDARD','ADMINISTRATOR'],
        default: 'STANDARD'
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
},
{versionKey: false}
);

const Users = mongoose.model('Users', usersSchema);
export default Users;