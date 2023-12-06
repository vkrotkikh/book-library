"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import booksReducer from './bookSlice';


const rootReducer = combineReducers({
  books: booksReducer,
},);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 