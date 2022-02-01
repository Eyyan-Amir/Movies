import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { rootReducer } from "./redux/reducer";

export const store = configureStore({
	reducer: { rootReducer },
	middleware: [thunk],
});
