import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const logger = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: () => "#139BFE",
    prevState: () => "#1C5FAF",
    action: () => "#149945",
    nextState: () => "#A47104",
    error: () => "#ff0005",
  },
});
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

//Devtools and redux developer setup that will be work only in development envirement
if (process.env.NODE_ENV === "development") {
  //@ts-ignore
  middlewares.push(logger);
}

export { middlewares, sagaMiddleware };
