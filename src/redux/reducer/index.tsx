import { moviesReducer } from "./reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ movie: moviesReducer });
