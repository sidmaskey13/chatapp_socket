import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import indexReducer from "./redux/indexReducer"
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState) {
    const store = createStore(indexReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
    return store;
}


