import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
},
{versionKey: false}
);

const Categories = mongoose.model('Categories', categoriesSchema);
export default Categories;