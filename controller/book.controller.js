import Book from "../model/book.model.js"

const getBook = async (req,res)=>{
    try {
        const book = await Book.find();
        res.status(200).json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export default getBook