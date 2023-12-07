'use client'
import { useState } from 'react';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Link, Button, Typography, Modal, Grid, FormControl, TextField, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from '@/app/lib/store';
import { deleteBook } from '@/app/lib/bookSlice';
import BookModal from './book-modal';

const BooksList = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const booksData = useSelector((state: RootState) => state.books);
    const [bookId, setBookId] = useState('');
    const [visibilityModal, setVisibilityModal] = useState(false);

    const openTestModal = (id?:string) => {
        id ? setBookId(id) : setBookId('')
        setVisibilityModal(true)
    }

    return (
        <Container fixed> 
            <Box className="page-heading">
            <Typography variant="h4"> Books List </Typography>
            <Button variant="contained" onClick={()=>{openTestModal()}}>Add Book</Button> 
            </Box>
            <TableContainer component={Paper}>
            <Table aria-label="table" className='books-list'>
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price $</TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {booksData.map((book) => (
                <TableRow key={book.id} >
                    <TableCell><Link onClick={()=>{openTestModal(book.id)}}>{book.name}</Link></TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell><Button onClick={()=>{dispatch(deleteBook(book.id))}}>Delete</Button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table> 
        </TableContainer>
            <BookModal visibility={visibilityModal} onClose={()=>{setVisibilityModal(false)}} bookId={bookId}  />
    </Container>
    )
}

export default BooksList;