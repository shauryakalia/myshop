import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import { RootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, RootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    thunk
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);