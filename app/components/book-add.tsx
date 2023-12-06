'use client'
import { useState } from 'react';
import { Box, Button, Typography, Modal, Grid, FormControl, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from '@/lib/store';
import { addBook} from '@/lib/bookSlice';
import { NewBookTypes } from './../types';

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

const BookAdd = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 

    const [bookName, setBookName] = useState('');
    const [bookCategory, setBookCategory] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [bookDescription, setBookDescription] = useState('');
    const [bookAddErrors, setBookAddErrors] = useState({
        bookName: "",
        bookCategory: "",
        bookPrice: "",
      });

    const [visibilityModal, setVisibilityModal] = useState(false);

    const handleAddBook = () => {
        const newBook:NewBookTypes = {
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
    
        setBookAddErrors(newErrors);

        if (!Object.values(newErrors).some((error) => error !== "")) {
            dispatch(addBook(newBook))
            setBookName('');
            setBookCategory('');
            setBookPrice(0);
            setBookDescription('');
            setVisibilityModal(false);
        }
    } 

return (
        <Box className="page-heading"> 
            <Button variant="contained" onClick={()=>{setVisibilityModal(true)}}>Add Book</Button> 
        <Modal
            open={visibilityModal}
            onClose={()=>{setVisibilityModal(false)}} 
        >
            <Box sx={style}>
            <Typography id="modal-itle" variant="h6" component="h2">
                Book Add
            </Typography> 
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
                    <Grid className='modal-footer' item xs={12}>
                        <Box className="modal-row-buttons">
                            <Button variant="outlined" onClick={()=>{setVisibilityModal(false)}}>Cancel</Button>
                            <Button variant="contained" onClick={handleAddBook}>Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal> 
        </Box>
)
}


export default BookAdd;