import { createStore, applyMiddleware } from "redux";
import { middlewares, sagaMiddleware } from "./middlewares";

import { rootSaga } from "./sagas/root.sagas";
import reducers from "./reducers";

export const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
