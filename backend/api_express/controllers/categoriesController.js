import Categories from "../models/Categories.js";
import Books from "../models/Categories.js";

export const showCategories = async (req,res)=>{
    try{
        const document = await Categories.find({});
        res.json(document);
    } catch (error){
        console.log(error);
    }   
};

export const showCategory = async (req,res)=>{
    const document = await Categories.findById(req.params.idCategory);
    if(!document){
        res.json({mensaje: 'Esa categoria no existe'})
    }
    res.json(document)
}

export const newCategory = async (req, res)=>{
    const category = new Categories(req.body);
    try {
        await category.save();
        res.json({ mensaje : 'Se agrego un nuevo categoria' });
    } catch (error) {
        res.send(error);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Categories.findByIdAndDelete({ _id : req.params.idCategory });
        res.json({mensaje : 'Categoria eliminado'});
    } catch (error) {
        console.log(error);
    }
};