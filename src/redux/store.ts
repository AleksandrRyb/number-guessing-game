import { createStore, applyMiddleware } from "redux";
import { middlewares, sagaMiddleware } from "./middlewares";
import reducers from "./reducers";

export const store = createStore(reducers, applyMiddleware(...middlewares));

// sagaMiddleware.run()
