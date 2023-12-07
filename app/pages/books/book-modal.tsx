'use client'
import { useState, useEffect } from 'react';
import {Box, Button, Typography, Modal, Grid, FormControl, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from '@/app/lib/store';
import { addBook, editBook } from '@/app/lib/bookSlice';
import { muiModalStyles } from '@/app/lib/mui-styles';
import {BookTypes } from '@/app/types';

const BookModal = ({bookId, visibility, onClose}:{bookId:string, visibility:boolean, onClose:()=>void}): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const booksData = useSelector((state: RootState) => state.books);
    const book = booksData.find((item) => item.id === bookId);
    const modalTitle = bookId.length ? 'Book Edit' : 'Book Add';

    const [bookName, setBookName] = useState('');
    const [bookCategory, setBookCategory] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [bookDescription, setBookDescription] = useState('');
    const [bookAddErrors, setBookAddErrors] = useState({ bookName: "", bookCategory: "", bookPrice: "", });

    const changeBookPrice = (value:string) => {
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value)) {
            setBookPrice(Number(value));
        }
    }

    useEffect(() => {
        if (book) {
            setBookName(book.name);
            setBookCategory(book.category);
            setBookPrice(book.price);
            setBookDescription(book.description || '');
        } else {
            setBookName('');
            setBookCategory('');
            setBookPrice(0);
            setBookDescription(''); 
            setBookDescription('');
        }
    }, [visibility]);

    const handleBookSubmit = () => {
        const newErrors = {
          bookName: bookName ? "" : "Name is required",
          bookCategory: bookCategory ? "" : "Category is required",
          bookPrice: bookPrice > 0 ? "" : "Price must be greater than 0",
        };

        setBookAddErrors(newErrors);
        const checkError = Object.values(newErrors).some((error) => error !== "");

        if (!checkError) {
            const BookObject:BookTypes = {
                id:bookId,
                name: bookName,
                category: bookCategory,
                price: bookPrice,
                description: bookDescription
            }
            
            bookId.length ? dispatch(editBook(BookObject)) : dispatch(addBook(BookObject))
            onClose()
        }
    } 
 
return (
    <Modal
            open={visibility}
            onClose={()=>{onClose()}} 
        >
            <Box sx={muiModalStyles}>
                <Box className="modal-header">
                    <Typography id="modal-itle" variant="h6" component="h2"> {modalTitle} </Typography> 
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField  
                                value={bookName}
                                error={!!bookAddErrors.bookName}
                                helperText={bookAddErrors.bookName}
                                onChange={({ target }) => setBookName(target.value)} 
                                label="Name" 
                                variant="outlined" />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField  
                                value={bookCategory}
                                error={!!bookAddErrors.bookCategory}
                                helperText={bookAddErrors.bookCategory}
                                onChange={({ target }) => setBookCategory(target.value)} 
                                label="Category" 
                                variant="outlined" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField 
                                value={bookPrice}
                                error={!!bookAddErrors.bookPrice}
                                helperText={bookAddErrors.bookPrice}
                                onChange={({ target }) => changeBookPrice(target.value)}
                                label="Price"
                                variant="outlined"/>
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
                    <Grid className='modal-footer' item xs={12}>
                        <Box className="modal-row-buttons">
                            <Button variant="outlined" onClick={()=>{onClose()}}>Cancel</Button>
                            <Button variant="contained" onClick={handleBookSubmit}>Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>  
)
}

export default BookModal;