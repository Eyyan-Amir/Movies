import React from "react";

import moviesReducer from "./reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ moviesReducer });
