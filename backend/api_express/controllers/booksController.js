import Books from "../models/Books.js";
import multer from "multer";

export const showBooks = async (req,res)=>{
    try{
        const document = await Books.find({}).populate("category").populate("author");
        res.json(document);
    } catch (error){
        console.log(error);
    }   
};
export const searchBooks = async (req,res)=>{
    try{
        const { query } = req.params;
        const document = await Books.find({ title: new RegExp(query, 'i')}).populate("author").populate("category")
        
        res.json(document);
    }catch(error){
        console.log(error);
    }
}

export const showBook = async (req,res)=>{
    const document = await Books.findById(req.params.idBook);
    if(!document){
        res.json({mensaje: 'Ese libro no existe'})
    }
    res.json(document)
}

export const updateBook = async (req,res)=>{
    try {
        console.log("Datos a modificar", req.body);

        const filter = { _id : req.body._id };
        const {title, description, author, published, cover, category} =  req.body;
        const options = {new : true};
        const data = {
            title,
            description,
            author,
            published,
            cover,
            category
        }
        const document = await Books.findOneAndUpdate(filter, data, options);
        res.json(document);
    } catch (error) {
        res.send(error);
    }
}

export const newBook = async (req, res)=>{
    const book = new Books(req.body);
    console.log(book);
    try {
        if(req.file && req.file.filename) {
            book.cover = req.file.filename
        }else{
            console.log("ninguna imagen");
        }
        const doc = await book.save();
        res.json({ 
            error:false,
            message : 'New book was added with id:'+doc._id 
        });
    } catch (error) {
        //res.send(error);
        res.json({ 
            error:true,
            message : error
        });
    }
}

export const deleteBook = async (req,res)=>{
    try {
        await Books.findByIdAndDelete({ _id : req.params.idBook });
        res.json({mensaje : 'Libro eliminado'});
    } catch (error) {
        console.log(error);
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname+'-'+Date.now()}`)
    }
});
const uploadMulter = multer({ storage: storage })
export const upload = uploadMulter.single('cover');