import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./redux/reducer";

export const store = createStore(
	rootReducer,
	//@ts-ignore
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	applyMiddleware(thunk)
	//@ts-ignore
);
