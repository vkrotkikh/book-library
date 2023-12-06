'use client'
import {useState} from 'react';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Link, Button, Typography, Modal, Grid, FormControl, TextField, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from '@/lib/store';
import { addBook, deleteBook, editBook } from '@/lib/bookSlice';
import { BookTypes, NewBookTypes } from './../types';
import BookAdd from './book-add';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const BookEdit = ({id, name}:{id:string, name:string}): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const booksData = useSelector((state: RootState) => state.books);

    const [bookId, setBookId] = useState('');
    const [bookName, setBookName] = useState('');
    const [bookCategory, setBookCategory] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [bookDescription, setBookDescription] = useState('');
    const [bookEditErrors, setBookEditErrors] = useState({
        bookName: "",
        bookCategory: "",
        bookPrice: "",
      });

    const [visibilityModal, setVisibilityModal] = useState(false);
    
    const openEditBookModal = () => {
        const editableBook = booksData.find((item) => item.id === id);
        if(editableBook){
            setBookId(id);
            setBookName(editableBook.name);
            setBookCategory(editableBook.category);
            setBookPrice(editableBook.price);
            setBookDescription(editableBook.description ? editableBook.description : '');
            setVisibilityModal(true);
        }
    }

    const handleEditBook = () => {
        const updatedBook:BookTypes = {
            id: bookId,
            name: bookName,
            category: bookCategory,
            price: bookPrice,
            description: bookDescription
        }
        
        const newErrors = {
            bookName: bookName ? "" : "Name is required",
            bookCategory: bookCategory ? "" : "Category is required",
            bookPrice: bookPrice > 0 ? "" : "Price must be greater than 0",
          };
      
          setBookEditErrors(newErrors);
  
          if (!Object.values(newErrors).some((error) => error !== "")) {
            dispatch(editBook(updatedBook))
            setVisibilityModal(false);
          }
    }

return (
    <>
    <Link onClick={openEditBookModal}>{name}</Link>
    <Modal
        open={visibilityModal}
        onClose={()=>{setVisibilityModal(false)}} 
    >
        <Box sx={style}>
        <Typography id="modal-itle" variant="h6" component="h2">
            Book Edit
        </Typography> 
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField  
                            value={bookName}
                            error={!!bookEditErrors.bookName}
                            helperText={bookEditErrors.bookName}
                            onChange={({ target }) => setBookName(target.value)} 
                            label="Name" 
                            variant="outlined" />

                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField  
                            value={bookCategory}
                            error={!!bookEditErrors.bookCategory}
                            helperText={bookEditErrors.bookCategory}
                            onChange={({ target }) => setBookCategory(target.value)} 
                            label="Category" 
                            variant="outlined" />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField 
                            value={bookPrice}
                            error={!!bookEditErrors.bookPrice}
                            helperText={bookEditErrors.bookPrice}
                            onChange={({ target }) => setBookPrice(Number(target.value))} 
                            type="number"
                            label="Price"
                            variant="outlined" 
                            InputProps={{ inputProps: { min: 0 } }} />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField 
                            value={bookDescription}
                            onChange={({ target }) => setBookDescription(target.value)}                                 
                            label="Description" 
                            variant="outlined" 
                            multiline 
                            rows="5" />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box className="modal-row-buttons">
                        <Button variant="outlined" onClick={()=>{setVisibilityModal(false)}}>Cancel</Button>
                        <Button variant="contained" onClick={handleEditBook}>Update</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Modal> 
    </> 
)
}


export default BookEdit;