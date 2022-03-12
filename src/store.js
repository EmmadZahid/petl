import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./rootSaga";
import { rootReducer } from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);