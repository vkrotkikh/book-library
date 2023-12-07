import { createSlice } from '@reduxjs/toolkit';
import { BookTypes } from '@/app/types';

const { v1: uuid } = require('uuid')

const initialState:BookTypes[] = [
    {
        id: "6b57e180-93b1-11ee-aa6f-9ff57e4a20bb",
        name: "Le Petit Prince",
        category: "Fiction, Children's literature",
        description: "In 2000 Harcourt proudly reissued Antoine de Saint-Exupéry's masterpiece, The Little Prince, in a sparkling new format.",
        price: 15
    },
    {
        id: "8b57e180-93b1-11ee-aa6f-9ff57e4a20bb",
        name: "The Lord of the Rings",
        category: "Modern fantasy",
        description: "Continuing the story of The Hobbit, this three-volume boxed set of Tolkien's epic masterpiece, The Lord of the Rings, features striking black covers based on Tolkien's own design.",
        price: 29
    }
];
const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks(state, action){
            return action.payload
        },
        addBook(state, action){
            const newBook = {...action.payload, id:uuid()}
            state.push(newBook)
        },
        editBook(state, action){
            const bookIndex = state.findIndex(book => book.id === action.payload.id)
            if(bookIndex !== -1){
                state[bookIndex] = { ...state[bookIndex], ...action.payload}
            }
        },
        deleteBook(state, action){
            return [ ...state.filter((item)=> item.id !== action.payload)]
        }
    }
})

export const { setBooks, editBook, addBook, deleteBook } = bookSlice.actions

export default bookSlice.reducer;
