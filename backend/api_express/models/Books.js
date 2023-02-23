import mongoose from "mongoose";
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        default: "No description"
    },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Categories'
    },
    published:{
        type:Date,
    },
    cover:{
        type: String,
        default: "no-image.png"
    }
},
{versionKey: false}
);

const Books = mongoose.model('Books', booksSchema);
export default Books;