'use client'
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Link, Button, Typography, Modal, Grid, FormControl, TextField, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, AppDispatch } from '@/lib/store';
import { deleteBook } from '@/lib/bookSlice';
import BookAdd from './book-add';
import BookEdit from './book-edit';

const BooksList = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch(); 
    const booksData = useSelector((state: RootState) => state.books);
return (
    <Container fixed>
        <Box className="page-heading">
        <Typography variant="h3" gutterBottom> Books List </Typography>
            <BookAdd />
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
                <TableCell><BookEdit id={book.id} name={book.name} /></TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell><Button onClick={()=>{dispatch(deleteBook(book.id))}}>Delete</Button></TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table> 
    </TableContainer>
  </Container>
)
}

export default BooksList;